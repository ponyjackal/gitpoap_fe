import React, { useContext, useState, useCallback, createContext, useMemo, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { NETWORKS } from '../../constants';
import { BackgroundPanel, BackgroundPanel2, TextLight, TextGray } from '../../colors';

type Props = {
  children: React.ReactNode;
};

const providerOptions = {};

let initWeb3Modal: Web3Modal;
if (typeof window !== 'undefined') {
  initWeb3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    theme: {
      background: BackgroundPanel,
      main: TextLight,
      secondary: TextGray,
      border: BackgroundPanel,
      hover: BackgroundPanel2,
    },
    providerOptions,
  });
}

type onChainProvider = {
  connect: () => Promise<Web3Provider | undefined>;
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  address: string;
  ensName: string | null;
  isConnected: boolean;
  web3Provider: JsonRpcProvider | null; // does this have to be | null? can we avoid?
  web3Modal: Web3Modal;
  chainId: number;
};

type Web3ContextState = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = createContext<Web3ContextState>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);

  if (!web3Context) {
    throw new Error(
      'useWeb3Context() can only be used inside of <Web3ContextProvider />, ' +
        'please declare it at a higher level.',
    );
  }

  const { onChainProvider } = web3Context;

  return useMemo<onChainProvider>(() => {
    return { ...onChainProvider };
  }, [onChainProvider]);
};

export const Web3ContextProvider = (props: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [web3Modal, _] = useState<Web3Modal>(initWeb3Modal);
  const [address, setAddress] = useState('');
  const [web3Provider, setWeb3Provider] = useState<JsonRpcProvider | null>(null);
  const [chainId, setChainId] = useState(NETWORKS[1].chainId);
  const [ensName, setEnsName] = useState<string | null>(null);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();

    setIsConnected(false);
    setAddress('');
    setWeb3Provider(null);

    window.location.reload(); // Necessary?
  }, [web3Modal]);

  const addListeners = useCallback(
    async (provider: JsonRpcProvider) => {
      provider.on('accountsChanged', () => {
        window.location.reload(); // Necessary?
      });

      provider.on('chainChanged', (chainId) => {
        setChainId(chainId);
        window.location.reload(); // Necessary?
      });

      provider.on('disconnect', () => {
        disconnect();
      });
    },
    [disconnect],
  );

  const hasCachedProvider = useCallback(() => {
    if (!web3Modal?.cachedProvider) {
      return false;
    }

    return true;
  }, [web3Modal]);

  const connect = useCallback(async () => {
    const provider = await web3Modal.connect();
    addListeners(provider);

    const web3Provider = new Web3Provider(provider, 'any');
    const connectedAddress = await web3Provider.getSigner().getAddress();

    setAddress(connectedAddress);
    setWeb3Provider(web3Provider);
    setIsConnected(true);

    return web3Provider;
  }, [web3Modal, addListeners]);

  /* Hook to check whether a cached provider exists. If it does, connect to provider */
  useEffect(() => {
    const isCached = hasCachedProvider();

    if (isCached && !isConnected) {
      connect();
    }
  }, [hasCachedProvider, isConnected, connect]);

  const fetchENSName = useCallback(
    async (address: string) => {
      const resolvedEnsName = await web3Provider?.lookupAddress(address);
      if (resolvedEnsName) {
        setEnsName(resolvedEnsName);
      }
    },
    [web3Provider],
  );

  useEffect(() => {
    if (address && !ensName) {
      fetchENSName(address);
    }
  }, [fetchENSName, address, ensName]);

  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      isConnected,
      address,
      ensName,
      web3Provider,
      web3Modal,
      chainId,
    }),
    [
      connect,
      disconnect,
      hasCachedProvider,
      isConnected,
      address,
      ensName,
      web3Provider,
      web3Modal,
      chainId,
    ],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{props.children}</Web3Context.Provider>;
};
