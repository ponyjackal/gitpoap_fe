import React from 'react';
import { Web3ContextProvider } from '../../src/components/wallet/Web3ContextProvider';
import { GHAuthProvider } from '../../src/components/github/GHAuthContext';
import { createClient, Provider as URQLProvider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';

const client = createClient({
  url: 'http://localhost:3001/graphql',
  requestPolicy: 'network-only',
});

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  /* @ts-ignore */
  push: () => {},
  /* @ts-ignore */
  replace: () => {},
  reload: () => {},
  back: () => {},
  /* @ts-ignore */
  prefetch: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isLocaleDomain: false,
};

export const withProviders = (storyFn) => {
  return (
    <RouterContext.Provider value={mockRouter}>
      <Web3ContextProvider>
        <MantineProvider theme={{ colorScheme: 'dark' }}>
          <URQLProvider value={client}>
            <GHAuthProvider>{storyFn()}</GHAuthProvider>
          </URQLProvider>
        </MantineProvider>
      </Web3ContextProvider>
    </RouterContext.Provider>
  );
};
