import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { rem } from 'polished';
import { Group, Space } from '@mantine/core';
import { ExtraHover, ExtraPressed, TextDarkGray, TextGray, TextLight } from '../colors';
import { BREAKPOINTS } from '../constants';
import { GitPOAPLogo } from './shared/elements/icons/GitPOAPLogoWhite';
import { Wallet } from './wallet/Wallet';
import { GitHub } from './github/GitHub';
import { SearchBox as SearchBoxUI } from './search/SearchBox';
import { useWeb3Context } from './wallet/Web3ContextProvider';

const Nav = styled(Group)`
  color: ${TextLight} !important;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: ${rem(24)} ${rem(45)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: ${rem(24)} ${rem(30)};
  }
`;

const ContentLeft = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`;

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Links = styled.div`
  font-family: 'PT Mono', monospace;
  color: ${TextGray} !important;
  font-size: ${rem(12)};
  font-weight: 700;
  letter-spacing: ${rem(2)};
  text-transform: uppercase;
`;

const StyledLink = styled.a`
  font-size: ${rem(12)};
  font-weight: 700;
  letter-spacing: ${rem(2)};
  text-transform: uppercase;
  color: ${TextGray};
  margin-right: ${rem(25)};
  transition: 150ms color ease;

  &:hover:not([disabled]) {
    color: ${ExtraHover};
  }
  &:active:not([disabled]) {
    color: ${ExtraPressed};
  }
  &[disabled] {
    color: ${TextDarkGray};
  }
`;

const ClaimButton = styled(GitHub)`
  margin-right: ${rem(12)};
`;

const SearchBox = styled(SearchBoxUI)`
  margin-right: ${rem(25)};
`;

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
};

export const Navbar = () => {
  const { isConnected, address, ensName } = useWeb3Context();

  const showPOAPsPage = false;
  const showProjectsPage = false;
  const showContributorsPage = false;
  const showDocsLink = false;

  return (
    <Nav>
      <Container>
        <Link href="/" passHref>
          <ContentLeft>
            <GitPOAPLogo />
          </ContentLeft>
        </Link>
        <Space />
        <ContentRight>
          <SearchBox />
          <Links>
            {showPOAPsPage && <NavLink href="/poaps">{'POAPS'}</NavLink>}
            {showProjectsPage && <NavLink href="/projects">{'Projects'}</NavLink>}
            {showContributorsPage && <NavLink href="/contributors">{'Contributors'}</NavLink>}
            {showDocsLink && <NavLink href="/docs">{'Docs'}</NavLink>}
            {isConnected && <NavLink href={`/p/${ensName ?? address}`}>{'Profile'}</NavLink>}
          </Links>
          <ClaimButton />
          <Wallet />
        </ContentRight>
      </Container>
    </Nav>
  );
};
