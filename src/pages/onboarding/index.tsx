import type { NextPage } from 'next';
import Head from 'next/head';
import { IntakeForm } from '../../components/IntakeForm';
import { Container } from '@mantine/core';

const SubmitRepos: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{'Onboarding | GitPOAP'}</title>
        <meta
          name="Submit your repos to GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="Submit Repos"
        />
      </Head>
      <Container size={800} mt="xl">
        <IntakeForm />
      </Container>
    </div>
  );
};

export default SubmitRepos;
