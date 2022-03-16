import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useQuery, gql } from 'urql';
import { JsonRpcSigner } from '@ethersproject/providers';
import { POAP } from '../../types';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../github/AuthContext';

const FeaturedPOAPsQuery = gql`
  query featuredPOAPs($address: String!) {
    profileFeaturedPOAPs(address: $address) {
      gitPOAPs {
        claim {
          id
          gitPOAP {
            repo {
              organization {
                name
              }
            }
          }
        }
        poap {
          event {
            image_url
            name
            description
          }
          tokenId
        }
      }
      poaps {
        event {
          name
          description
          image_url
        }
        tokenId
      }
    }
  }
`;

export type GitPOAP = {
  claim: {
    id: string;
    gitPOAP: {
      repo: {
        organization: {
          name: string;
        };
      };
    };
  };
  poap: POAP;
};

export type UserPOAPsQueryRes = {
  profileFeaturedPOAPs: {
    gitPOAPs: GitPOAP[];
    poaps: POAP[];
  };
};

type FeaturedPOAPsState = {
  featuredPOAPsFull: (GitPOAP | POAP)[];
  featuredPOAPTokenIDs: Record<string, true>;
};

type FeaturedPOAPsData = {
  featuredPOAPsState: FeaturedPOAPsState;
  showHearts: boolean;
};

type FeaturedPOAPsDispatch = {
  addFeaturedPOAP: (poapTokenId: string) => void;
  removeFeaturedPOAP: (poapTokenId: string) => void;
};

/* -- Set up the Context -- */
export const getInitialState = (): FeaturedPOAPsState =>
  ({
    featuredPOAPsFull: [],
    featuredPOAPTokenIDs: {} as Record<string, true>,
  } as FeaturedPOAPsState);

const FeaturedPOAPsContext = createContext<FeaturedPOAPsData>({} as FeaturedPOAPsData);
const FeaturedPOAPsDispatchContext = createContext<FeaturedPOAPsDispatch>(
  {} as FeaturedPOAPsDispatch,
);

export const useFeaturedPOAPs = () => useContext(FeaturedPOAPsContext);
export const useFeaturedPOAPsDispatch = () => useContext(FeaturedPOAPsDispatchContext);

/* -- The Provider -- */
type Props = {
  children: React.ReactNode;
  address: string;
};

export const FeaturedPOAPsProvider = ({ children, address }: Props) => {
  const { web3Provider } = useWeb3Context();
  const signer = web3Provider?.getSigner();
  const { tokens } = useAuthContext();
  const [showHearts, setShowHearts] = useState(false);
  const [featuredPOAPsState, setFeaturedPOAPsState] = useState<FeaturedPOAPsState>(
    getInitialState(),
  );
  const [result, refetch] = useQuery<UserPOAPsQueryRes>({
    query: FeaturedPOAPsQuery,
    variables: {
      address,
    },
  });

  const checkIfUserOwnsProfile = useCallback(async (address: string, signer: JsonRpcSigner) => {
    const walletAddress = await signer?.getAddress();
    if (address.toLocaleLowerCase() === walletAddress?.toLocaleLowerCase()) {
      setShowHearts(true);
    } else {
      setShowHearts(false);
    }
  }, []);

  /* Checks if the user owns the profile they're currently viewing */
  useEffect(() => {
    if (address && signer) {
      checkIfUserOwnsProfile(address, signer);
    }
  }, [address, signer, checkIfUserOwnsProfile]);

  /* Hook to append new data onto existing list of poaps */
  useEffect(() => {
    if (result.data?.profileFeaturedPOAPs) {
      const profileFeaturedPOAPs = result.data.profileFeaturedPOAPs;
      const ids = [
        ...profileFeaturedPOAPs.gitPOAPs.map((gitpoap) => gitpoap.poap.tokenId),
        ...profileFeaturedPOAPs.poaps.map((poap) => poap.tokenId),
      ];
      setFeaturedPOAPsState({
        featuredPOAPsFull: [...profileFeaturedPOAPs.gitPOAPs, ...profileFeaturedPOAPs.poaps],
        featuredPOAPTokenIDs: ids.reduce((acc, id) => ({ ...acc, [id]: true }), {}),
      });
    }
  }, [result.data]);

  const addFeaturedPOAP = useCallback(
    async (poapTokenId: string) => {
      const signature = await signer?.signMessage(
        JSON.stringify({
          action: 'add',
          poapTokenId,
        }),
      );
      const address = await signer?.getAddress();

      try {
        await fetch(`${GITPOAP_API_URL}/featured`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({
            address,
            poapTokenId,
            signature,
          }),
        });
        refetch({ requestPolicy: 'network-only' });
      } catch (err) {
        console.error(err);
      }
    },
    [refetch, signer, tokens?.accessToken],
  );

  const removeFeaturedPOAP = useCallback(
    async (poapTokenId: string) => {
      const signature = await signer?.signMessage(
        JSON.stringify({
          action: 'remove',
          poapTokenId,
        }),
      );
      const address = await signer?.getAddress();

      try {
        await fetch(`${GITPOAP_API_URL}/featured/${poapTokenId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({
            address,
            signature,
          }),
        });
        refetch({ requestPolicy: 'network-only' });
      } catch (err) {
        console.error(err);
      }
    },
    [refetch, signer, tokens?.accessToken],
  );

  return (
    <FeaturedPOAPsContext.Provider value={{ featuredPOAPsState, showHearts }}>
      <FeaturedPOAPsDispatchContext.Provider value={{ addFeaturedPOAP, removeFeaturedPOAP }}>
        {children}
      </FeaturedPOAPsDispatchContext.Provider>
    </FeaturedPOAPsContext.Provider>
  );
};
