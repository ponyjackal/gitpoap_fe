import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { Page } from './_app';
import { TextLight } from '../colors';
import { BannerStats } from '../components/home/BannerStats';
import { Layout } from '../components/Layout';
import { MostClaimed } from '../components/home/MostClaimed';
import { LeaderBoard } from '../components/home/LeaderBoard';
import { RecentlyAdded } from '../components/home/RecentlyAdded';
import { SuggestionForm } from '../components/home/SuggestionForm';
import { BackgroundHexes } from '../components/home/BackgroundHexes';
import { useFeatures } from '../components/FeaturesContext';

const HeaderStyled = styled.span`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(24)};
  line-height: ${rem(30)};
  text-align: center;
  letter-spacing: ${rem(1)};
  color: ${TextLight};
  margin-bottom: ${rem(60)};
  margin-top: ${rem(75)};
`;

const Background = styled(BackgroundHexes)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: -1;
  width: 100%;
  min-width: ${rem(1200)};
`;

const Home: Page = () => {
  const features = useFeatures();

  return (
    <>
      <Head>
        <title>{'App | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Frontend App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid justify="center" style={{ zIndex: 0, position: 'relative' }}>
        <Background />
        <Grid.Col span={8} style={{ zIndex: 0 }}>
          <HeaderStyled>{'Issue POAPs to your GitHub contributors'}</HeaderStyled>
        </Grid.Col>
        <Grid.Col span={8}>
          <BannerStats />
        </Grid.Col>
      </Grid>
      <Grid justify="center" style={{ marginTop: rem(100), marginBottom: rem(100) }}>
        <Grid.Col span={7} style={{ zIndex: 0 }}>
          <MostClaimed />
        </Grid.Col>
        <Grid.Col span={3} style={{ zIndex: 0 }}>
          <LeaderBoard />
        </Grid.Col>
      </Grid>
      {features.hasHomePageRecentProjects && (
        <Grid justify="center" style={{ zIndex: 0, marginBottom: rem(100) }}>
          <Grid.Col span={10}>
            <RecentlyAdded />
          </Grid.Col>
        </Grid>
      )}
      <Grid justify="center" style={{ marginBottom: rem(100) }}>
        <Grid.Col span={10}>
          <SuggestionForm />
        </Grid.Col>
      </Grid>
    </>
  );
};

/* Custom layout function for this Home page */
Home.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Home;
