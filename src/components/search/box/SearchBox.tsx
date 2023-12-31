import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { getHotkeyHandler, useDebouncedValue } from '@mantine/hooks';
import { Text, Tooltip } from '@mantine/core';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { rem } from 'polished';
import { Loader, Input } from '../../shared/elements';
import { GitPOAPBadgeSearchItem, NoResultsSearchItem, ProfileSearchItem } from './SearchItem';
import { BackgroundPanel2, TextGray, DarkGray } from '../../../colors';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useKeyPress } from '../../../hooks/useKeyPress';
import {
  useOrgSearchByNameQuery,
  useRepoSearchByNameQuery,
  useSearchForStringQuery,
  useGitPoapSearchByNameQuery,
} from '../../../graphql/generated-gql';
import { BREAKPOINTS } from '../../../constants';
import { useGeneratedProfileResult } from '../useGeneratedProfileResult';
import { trackClickSearchItem, trackSearchInputFocused } from '../../../lib/tracking/events';

const Container = styled.div<{ isActive: boolean }>`
  margin-right: ${rem(25)};
  width: ${rem(300)};
  position: relative;
  min-width: ${rem(240)};
  transition: width 200ms ease-in-out;

  @media (max-width: ${rem(BREAKPOINTS.lg)}) {
    width: ${rem(240)};
  }

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    width: 100%;
  }

  /* Any screen width ABOVE breakpoint XL */
  @media (min-width: ${rem(BREAKPOINTS.xl)}) {
    ${({ isActive }) => (isActive ? `width: ${rem(400)};` : null)}
  }
`;

const SearchInput = styled(Input)`
  width: inherit;
  min-width: inherit;
  .mantine-TextInput-input {
    &::placeholder {
      color: ${TextGray};
      text-transform: uppercase;
    }
  }
`;

const Results = styled.div`
  padding: ${rem(10)} 0;
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  top: ${rem(45)};
  left: 0;
  width: inherit;
  min-width: inherit;
  background-color: ${BackgroundPanel2};
  z-index: 1;
  border-radius: ${rem(6)};
`;

const ResultsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:not(:first-child) {
    margin-top: ${rem(15)};
  }
`;

const SectionTitle = styled(Text)`
  padding-left: ${rem(10)};
  font-family: 'PT Mono';
  line-height: ${rem(15)};
  color: ${TextGray};
  font-size: ${rem(11)};
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: ${rem(5)};
  letter-spacing: ${rem(2)};
`;

const InputHintText = styled(Text)`
  width: ${rem(25)};
  text-align: center;
  font-size: ${rem(10)};
  border-radius: ${rem(4)};
  padding: ${rem(3)};
  background-color: ${DarkGray};
  color: ${TextGray};
  cursor: help;
`;

type Props = {
  className?: string;
};

type InputHintSectionProps = {
  isFocused: boolean;
};

const InputHintSection = ({ isFocused }: InputHintSectionProps) => (
  <Tooltip
    label={
      isFocused
        ? 'Press ESC to get out of the search box'
        : 'Press / to set focus on the search box'
    }
    position="top"
    withArrow
    transition="pop-bottom-right"
  >
    <InputHintText>{isFocused ? 'ESC' : '/'}</InputHintText>
  </Tooltip>
);

export const SearchBox = ({ className }: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(-1);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const isSlashPressed = useKeyPress({ targetKey: '/' });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([inputRef, resultsRef], () => setIsSearchActive(false));
  const [profileResult, refetchProfiles] = useSearchForStringQuery({
    pause: true,
    variables: {
      text: debouncedQuery.trim(),
    },
  });
  const [repoResults] = useRepoSearchByNameQuery({
    variables: { search: debouncedQuery.trim() },
  });
  const [orgResults, refetchOrgs] = useOrgSearchByNameQuery({
    pause: true,
    variables: { search: debouncedQuery.trim() },
  });
  const [gitPOAPResults, refetchGitPoaps] = useGitPoapSearchByNameQuery({
    pause: true,
    variables: {
      search: debouncedQuery.trim(),
    },
  });
  const [profileResults, setProfileResults] = useGeneratedProfileResult(
    debouncedQuery,
    profileResult,
  );

  const repos = useMemo(
    () => repoResults.data?.repos.filter((repo) => repo.project.gitPOAPs.length > 0) ?? [],
    [repoResults.data?.repos],
  );
  const orgs = useMemo(
    () =>
      orgResults.data?.githubOrganizations.filter(
        (org) => org.repos.length > 0 && org.repos[0].project.gitPOAPs.length > 0,
      ) ?? [],
    [orgResults.data?.githubOrganizations],
  );
  const gitPOAPs = gitPOAPResults.data?.gitPOAPS;
  const isLoading =
    profileResult.fetching ||
    repoResults.fetching ||
    orgResults.fetching ||
    gitPOAPResults.fetching;

  const hasAnyResults =
    profileResults.length > 0 ||
    (repos && repos?.length > 0) ||
    (orgs && orgs?.length > 0) ||
    (gitPOAPs && gitPOAPs?.length > 0);

  /* Sort orgs based on the most recent repo update time */
  const sortedOrgs = orgs?.sort((a, b) => {
    if (a.repos[0].lastPRUpdatedAt < b.repos[0].lastPRUpdatedAt) {
      return 1;
    }
    if (a.repos[0].lastPRUpdatedAt > b.repos[0].lastPRUpdatedAt) {
      return -1;
    }
    return 0;
  });

  /* auto complete list counts */
  const profilesCount = profileResults.length < 4 ? profileResults.length : 4;
  const reposCount = repos?.length ?? 0;
  const orgsCount = orgs?.length ?? 0;
  const gitPOAPCount = gitPOAPs?.length ?? 0;
  const repoStartIndex = profilesCount + gitPOAPCount;
  const orgStartIndex = profilesCount + gitPOAPCount + reposCount;
  const totalCount = profilesCount + gitPOAPCount + reposCount + orgsCount;

  /* This hook is used to refetch search data when the debounced query changes */
  useEffect(() => {
    if (debouncedQuery.length >= 1) {
      if (refetchProfiles) {
        refetchProfiles();
      }
      if (refetchOrgs) {
        refetchOrgs();
      }
      if (refetchGitPoaps) {
        refetchGitPoaps();
      }
    }
  }, [debouncedQuery, refetchProfiles, refetchOrgs, refetchGitPoaps]);

  /* This hook is used to clear stored results to ensure no random autocomplete flashes - urql caches results ~ so 🤪 */
  useEffect(() => {
    setCursor(-1);
  }, [query, debouncedQuery]);

  /* This hook is used to set focus on search input */
  useEffect(() => {
    if (isSlashPressed) {
      setCursor(-1);
      inputRef.current?.focus();
    }
  }, [isSlashPressed]);

  /* Handle keydown on search input box */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      /* Arrow up/down button should select next/previous list element */
      if (e.code === 'ArrowUp' && cursor > -1) {
        e.preventDefault();
        setCursor((prevCursor) => prevCursor - 1);
      } else if (e.code === 'ArrowDown' && cursor < totalCount - 1) {
        e.preventDefault();
        setCursor((prevCursor) => prevCursor + 1);
      } else if (e.code === 'Enter' && cursor > -1) {
        e.preventDefault();

        setQuery('');
        setIsSearchActive(false);
        setProfileResults([]);

        if (cursor < profilesCount) {
          /* profile is selected */
          inputRef.current?.blur();
          void router.push(profileResults[cursor].href);
        } else if (cursor < repoStartIndex) {
          /* gitPOAP is selected */
          inputRef.current?.blur();
          const gitPOAPIndex = cursor - profilesCount;
          if (gitPOAPs) {
            const gitPOAP = gitPOAPs[gitPOAPIndex];
            void router.push(`/gp/${gitPOAP.id}`);
          }
        } else if (cursor < orgStartIndex) {
          /* repo is selected */
          inputRef.current?.blur();
          const repoIndex = cursor - repoStartIndex;
          if (repos) {
            const repo = repos[repoIndex];
            void router.push(`/gh/${repo.organization.name}/${repo.name}`);
          }
        } else {
          /* org is selected */
          inputRef.current?.blur();
          const orgIndex = cursor - orgStartIndex;
          if (orgs) {
            const org = orgs[orgIndex];
            void router.push(`/gh/${org.name}`);
          }
        }
      }
    },
    [
      cursor,
      profilesCount,
      orgStartIndex,
      totalCount,
      gitPOAPs,
      orgs,
      repos,
      profileResults,
      router,
      repoStartIndex,
      setProfileResults,
    ],
  );

  return (
    <Container
      className={className}
      onFocus={() => setIsSearchActive(true)}
      onKeyDown={getHotkeyHandler([
        [
          'Escape',
          () => {
            setIsSearchActive(false);
            inputRef.current?.blur();
          },
        ],
        [
          'Enter',
          () => {
            if (!query || cursor > -1) return;
            setIsSearchActive(false);
            inputRef.current?.blur();
            void router.push(`/s/${query}`);
          },
        ],
      ])}
      isActive={isSearchActive}
    >
      <SearchInput
        inputRef={inputRef}
        placeholder={'POAP.ETH OR 0xf6B6...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={isLoading ? <Loader size={18} /> : <FaSearch />}
        onKeyDown={handleKeyDown}
        rightSection={<InputHintSection isFocused={isSearchInputFocused} />}
        onFocus={() => {
          trackSearchInputFocused();
          setIsSearchInputFocused(true);
        }}
        onBlur={() => {
          setIsSearchInputFocused(false);
        }}
      />

      {isSearchActive && (
        <Results ref={resultsRef}>
          {profileResults.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'Profiles:'}</SectionTitle>
              {profileResults.slice(0, 4).map((profile, index) => {
                return (
                  <ProfileSearchItem
                    key={profile.id}
                    href={profile.href}
                    address={profile.address}
                    ensName={profile.ensName}
                    ensAvatarUrl={profile.ensAvatarUrl}
                    useDefaultImageTag={profile.useDefaultImageTag}
                    onClick={() => {
                      trackClickSearchItem('profile', profile.id);
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    isSelected={cursor === index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {gitPOAPs && gitPOAPs?.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'GitPOAPs:'}</SectionTitle>
              {gitPOAPs.map((gitPOAP, index) => {
                return (
                  <GitPOAPBadgeSearchItem
                    key={gitPOAP.id}
                    href={`/gp/${gitPOAP.id}`}
                    text={
                      gitPOAP.name.startsWith('GitPOAP: ') ? gitPOAP.name.slice(8) : gitPOAP.name
                    }
                    onClick={() => {
                      trackClickSearchItem('gitpoap', gitPOAP.id);
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    imageUrl={gitPOAP.imageUrl}
                    isSelected={cursor === profilesCount + index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {repos && repos?.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'Repos:'}</SectionTitle>
              {repos.map((repo, index) => {
                return (
                  <GitPOAPBadgeSearchItem
                    key={repo.id}
                    href={`/gh/${repo.organization.name}/${repo.name}`}
                    text={repo.name}
                    subText={repo.organization.name}
                    imageUrl={repo.project.gitPOAPs[0].imageUrl}
                    onClick={() => {
                      trackClickSearchItem('repo', repo.id);
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    isSelected={cursor === repoStartIndex + index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {sortedOrgs && sortedOrgs?.length > 0 && (
            <ResultsSection>
              <SectionTitle>{'Orgs:'}</SectionTitle>
              {sortedOrgs.map((org, index) => {
                return (
                  <GitPOAPBadgeSearchItem
                    key={org.id}
                    href={`/gh/${org.name}`}
                    text={org.name}
                    onClick={() => {
                      trackClickSearchItem('org', org.id);
                      setQuery('');
                      setIsSearchActive(false);
                      setProfileResults([]);
                    }}
                    imageUrl={org.repos[0].project.gitPOAPs[0].imageUrl}
                    isSelected={cursor === orgStartIndex + index}
                  />
                );
              })}
            </ResultsSection>
          )}
          {!isLoading && !hasAnyResults && debouncedQuery.length > 1 && query.length > 1 && (
            <ResultsSection>
              <NoResultsSearchItem />
            </ResultsSection>
          )}
        </Results>
      )}
    </Container>
  );
};
