import { addDecorator } from '@storybook/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { withGlobalStyles } from './decorators/withGlobalStyles';
import { withProviders } from './decorators/withProviders';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import * as NextImage from 'next/image';
import * as handlers from '../src/stories/data/handlers';

// Initialize Mock Service Worker (MSW)
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

// NextJS Image Config
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <OriginalNextImage {...props} unoptimized />;
  },
});

addDecorator(withGlobalStyles);
addDecorator(withProviders);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  msw: {
    handlers,
  },
};
