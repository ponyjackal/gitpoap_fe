import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { withUrqlClient, SSRData } from 'next-urql';
import { NextPageWithLayout } from '../_app';
import { Grid } from '@mantine/core';
import { SEO } from '../../components/shared/compounds/SEO';
import { Header } from '../../components/shared/elements/Header';
import { OrgPage, OrgNotFound } from '../../components/organization/OrgPage';
import {
  OrganizationSeoByIdQuery,
  OrganizationSeoByIdDocument,
  OrgsGetStaticPathsQuery,
  OrgsGetStaticPathsDocument,
} from '../../graphql/generated-gql';
import { createSSRUrqlClient, urqlClientOptions } from '../../lib/urql';

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  urqlState: SSRData;
  data: OrganizationSeoByIdQuery | null;
};

const Organization: NextPageWithLayout<PageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const orgId = parseInt(id);

  if (isNaN(orgId)) {
    return <Error>{'404'}</Error>;
  }

  const org = props.data?.organizationData;

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <SEO
        title={`${org?.name ?? 'GitPOAP'} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/gh/${org?.name}`}
      />
      {org?.id ? <OrgPage orgId={org.id} /> : <OrgNotFound>{'Organization Not Found'}</OrgNotFound>}
    </Grid>
  );
};

/* Based on the path objects generated in getStaticPaths, statically generate pages for all
 * unique org ids at built time.
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
): Promise<{ props: PageProps }> => {
  const { client, ssrCache } = createSSRUrqlClient();
  const orgId = parseInt(context.params?.id as string);
  const results = await client
    ?.query<OrganizationSeoByIdQuery>(OrganizationSeoByIdDocument, {
      orgId,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      data: results?.data ?? null,
    },
  };
};

/* Statically generate all repo pages at build time - collect all sets of unique paths
 * paths: { params: { id: string } }[]
 */
export const getStaticPaths = async () => {
  const { client } = createSSRUrqlClient();
  const results = await client
    ?.query<OrgsGetStaticPathsQuery>(OrgsGetStaticPathsDocument, {})
    .toPromise();

  const paths =
    results?.data?.githubOrganizations.map((org) => ({
      params: { id: org.id.toString() },
    })) ?? [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export default withUrqlClient(
  () => urqlClientOptions,
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Organization);
