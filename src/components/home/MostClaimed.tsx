import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../shared/elements/Header';
import { GitPoap } from '../../types';
import { GitPOAP as GitPOAPUI } from '../shared/compounds/GitPOAP';
import { Button } from '../shared/elements/Button';
import { FaArrowRight } from 'react-icons/fa';

type Props = {
  title: string;
  poaps: GitPoap[];
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${rem(10)};
  margin-bottom: ${rem(150)};
`;

const Poaps = styled.div`
  display: inline-flex;
  flex-direction: row;
  max-width: ${rem(1000)};
  flex-wrap: wrap;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
`;

const GitPOAP = styled(GitPOAPUI)`
  margin-right: ${rem(36)};
  margin-bottom: ${rem(36)};
`;

export const MostClaimed = ({ poaps }: Props) => {
  return (
    <Container>
      <Header>{'Most claimed POAPs last week'}</Header>

      <Poaps>
        {poaps.map((gitPoap) => {
          return (
            <GitPOAP
              key={gitPoap.id}
              imgSrc={gitPoap.imgSrc}
              name={gitPoap.name}
              orgName={gitPoap.orgName}
            />
          );
        })}
      </Poaps>
      <Button variant="outline" rightIcon={<FaArrowRight />}>
        {'ALL POAPS'}
      </Button>
    </Container>
  );
};
