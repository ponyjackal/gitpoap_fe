import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { LinkStyles } from '../../components/shared/elements/NavLink';
import { OrganizationDataQuery } from '../../graphql/generated-gql';
import { Header as HeaderText } from '../shared/elements/Header';
import { GitHub, GitPOAP, Minted, People, Project } from '../shared/elements/icons';
import {
  Social,
  StyledLink,
  SubHeader,
  SubHeaderItem,
  SubHeaderItemCount,
  SubHeaderItemLabel,
} from '../repo/Header';
import { ExtraHover } from '../../colors';
import { BREAKPOINTS } from '../../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  width: ${rem(480)};
  max-width: 90%;

  a {
    text-decoration: none;
    &:hover {
      color: ${ExtraHover};
      cursor: pointer;
    }
  }

  @media (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: ${rem(24)};
  }
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: ${rem(48)};
  }
`;

const HeaderWrapper = styled(Wrapper)`
  height: ${rem(600)};
`;

const OrganizationTag = styled.div`
  ${LinkStyles}
  font-size: ${rem(11)};
`;

type Props = {
  org: Exclude<OrganizationDataQuery['organizationData'], null | undefined>;
};

export const Header = ({ org }: Props) => (
  <HeaderWrapper>
    <OrganizationTag>{'Organization'}</OrganizationTag>
    <HeaderText>{org.name}</HeaderText>
    <Social>
      <StyledLink
        href={`https://github.com/${org.name}`}
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <GitHub />
      </StyledLink>
    </Social>
    <SubHeader>
      <SubHeaderItem>
        <People />
        <SubHeaderItemCount>{org.contributorCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'Holders'}</SubHeaderItemLabel>
      </SubHeaderItem>
      <SubHeaderItem>
        <GitPOAP />
        <SubHeaderItemCount>{org.gitPOAPCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'GitPOAPs'}</SubHeaderItemLabel>
      </SubHeaderItem>
      <SubHeaderItem>
        <Minted />
        <SubHeaderItemCount>{org.mintedGitPOAPCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'Minted'}</SubHeaderItemLabel>
      </SubHeaderItem>
      <SubHeaderItem>
        <Project />
        <SubHeaderItemCount>{org.repoCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'Repos'}</SubHeaderItemLabel>
      </SubHeaderItem>
    </SubHeader>
  </HeaderWrapper>
);
