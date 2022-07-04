import React from 'react';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { OrganizationList } from '../../components/orgs/OrganizationList';
import { Layout } from '../../components/Layout';
import { SEO } from '../../components/SEO';

const Orgs: Page = () => {
  return (
    <>
      <SEO
        title={`Organizations | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/orgs`}
      />

      <Grid justify="center">
        <Grid.Col span={10}>
          <OrganizationList />
        </Grid.Col>
      </Grid>
    </>
  );
};

/* Custom layout function for this page */
Orgs.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Orgs;
