import React from 'react';
import { rem } from 'polished';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { Layout } from '../../components/Layout';
import { AllPOAPs } from '../../components/profile/AllPOAPs';

const Profile: Page = () => {
  return (
    <>
      <Head>
        <title>{'Profile | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ color: 'white' }}>{'The Banner goes here'}</div>
      <Grid style={{ color: 'white' }} justify="center">
        <Grid.Col span={12}>{'The Profile Hex'}</Grid.Col>
        <Grid justify="center">
          <Grid.Col span={11}>{'Featured POAPs'}</Grid.Col>
          <Grid.Col span={11}>{/* <GitPOAPs /> */}</Grid.Col>
          <Grid.Col span={11} style={{ marginBottom: rem(150) }}>
            <AllPOAPs />
          </Grid.Col>
        </Grid>
      </Grid>
    </>
  );
};

/* Custom layout function for this page */
Profile.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Profile;
