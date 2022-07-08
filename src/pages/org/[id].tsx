import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';

import { Page } from '../_app';
import { Layout } from '../../components/Layout';
import { Grid } from '@mantine/core';
import { SEO } from '../../components/SEO';
import { Header } from '../../components/shared/elements/Header';
import { OrgPage } from '../../components/organization/OrgPage';
import {
  OrganizationDataByIdQuery,
  OrganizationDataByIdDocument,
} from '../../graphql/generated-gql';
import { ONE_HOUR } from '../../constants';

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  data: OrganizationDataByIdQuery;
};

const Organization: Page<PageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const orgId = parseInt(id);

  if (isNaN(orgId)) {
    return <Error>{'404'}</Error>;
  }

  const org = props.data.organizationData;

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <SEO
        title={`${org?.name ?? 'GitPOAP'} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/org/${org?.id}`}
      />
      <OrgPage org={org} />
    </Grid>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  context.res?.setHeader(
    'Cache-Control',
    `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${2 * ONE_HOUR}`,
  );

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const orgId = parseInt(context.query.id as string);
  const results = await client!
    .query<OrganizationDataByIdQuery>(OrganizationDataByIdDocument, {
      orgId,
    })
    .toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
      data: results.data,
      revalidate: 600,
    },
  };
}

/* Custom layout function for this page */
Organization.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default withUrqlClient(
  (_) => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Organization);
