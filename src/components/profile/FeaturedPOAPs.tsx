import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { POAP } from '../../types';
import { POAPBadge as POAPBadgeUI } from '../shared/elements/POAPBadge';
import { TextAccent } from '../../colors';
import { GitPOAP } from '../shared/compounds/GitPOAP';
import { useFeaturedPOAPs, GitPOAP as GitPOAPType } from './FeaturedPOAPsContext';
import { Text } from '@mantine/core';

const POAPs = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${rem(50)};
`;

const POAPBadge = styled(POAPBadgeUI)`
  &:not(:last-child) {
    margin-right: ${rem(40)};
  }
  margin-top: ${rem(30)};
`;

const SectionTitle = styled(Text)`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(30)};
  line-height: ${rem(42)};
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  margin-bottom: ${rem(30)};
`;

const isGitPOAP = (poap: POAP | GitPOAPType): poap is GitPOAPType => {
  return 'claim' in poap;
};

export const FeaturedPOAPs = () => {
  const {
    featuredPOAPsState: { featuredPOAPsFull },
  } = useFeaturedPOAPs();

  return (
    <>
      {featuredPOAPsFull.length > 0 && (
        <>
          <SectionTitle>{'Featured by the user'}</SectionTitle>
          <POAPs>
            {featuredPOAPsFull.map((featuredPOAP) => {
              if (isGitPOAP(featuredPOAP)) {
                return (
                  <GitPOAP
                    key={featuredPOAP.claim.id}
                    name={featuredPOAP.poap.event.name}
                    imgSrc={featuredPOAP.poap.event.image_url}
                    orgName={featuredPOAP.claim.gitPOAP.repo.organization.name}
                    description={featuredPOAP.poap.event.description}
                    poapTokenId={featuredPOAP.poap.tokenId}
                  />
                );
              }

              return (
                <POAPBadge
                  key={featuredPOAP.tokenId}
                  poapTokenId={featuredPOAP.tokenId}
                  name={featuredPOAP.event.name}
                  imgSrc={featuredPOAP.event.image_url}
                  href={`https://app.poap.xyz/token/${featuredPOAP.tokenId}`}
                />
              );
            })}
          </POAPs>
        </>
      )}
    </>
  );
};
