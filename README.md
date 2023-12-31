
## Running locally
This is a [Next.js](https://nextjs.org/) project - view the [docs](https://nextjs.org/docs/getting-started) for more info.

Example `.env`

```bash
NEXT_PUBLIC_SENTRY_DSN=https://99be3ffab4cc404ea3283c08cf6b020a@o1178229.ingest.sentry.io/6289197
NEXT_PUBLIC_SENTRY_ENVIRONMENT='development'
SENTRY_AUTH_TOKEN=fcb9a6ffbe8b4ee8bd724a43834eaf63737e4eb9f9334b39ad96ead41cc5a906
NEXT_PUBLIC_INFURA_ID=f0c94ead4d8d4ae1a0fb33053fc7db4b
NEXT_PUBLIC_REACT_APP_CLIENT_ID=2c27505d957d66f74122
NEXT_PUBLIC_GITPOAP_API_URL=http://localhost:3001
NEXT_PUBLIC_DISCORD_CLIENT_ID=1042426571337769011
NEXT_PUBLIC_AMPLITUDE_TOKEN=51da890c7ce05025d3fae48a91605f19
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

View the component library on a deployed version of [Storybook](https://gitpoap-fe-storybook.vercel.app/?path=/story/button--primary0).

## GraphQL Code generation

`yarn gql:generate-dev`: Generate graphql hooks and types based on a local version of `schema.graphql` found in `gitpoap-backend`

`yarn gql:generate`: Generate graphql hooks and types based on the graphql schema found at `api.gitpoap.io/graphql`