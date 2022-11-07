import { Modal, Table } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { rem } from 'polished';
import React, { useEffect } from 'react';
import { FaGithub as GithubIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { VscGlobe as GlobeIcon } from 'react-icons/vsc';
import styled from 'styled-components';

import { useClaimContext } from '../claims/ClaimContext';
import { Index } from '../home/LeaderBoardItem';
import { IconLink } from '../shared/compounds/Link';
import { Text, Button, Header as HeaderText, GitPOAPBadge, TitleLink } from '../shared/elements';
import { textEllipses } from '../shared/styles';
import { TextGray, ExtraHover, PrimaryBlue } from '../../colors';
import { useOAuthContext } from '../oauth/OAuthContext';
import { useFeatures } from '../../components/FeaturesContext';
import { BREAKPOINTS } from '../../constants';
import { useGitPoapEventQuery } from '../../graphql/generated-gql';
import { useUser } from '../../hooks/useUser';

type Props = {
  gitPOAPId: number;
};

export const Wrapper = styled.div`
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

const TitleStyled = styled(HeaderText)`
  margin-top: ${rem(24)};
`;

const Description = styled(Text)`
  margin-top: ${rem(16)};
  font-size: ${rem(16)};
  margin-bottom: ${rem(30)};
`;

export const RepoName = styled(Text)`
  display: flex;
  font-weight: 700;
  color: ${TextGray};
  margin-bottom: ${rem(7)};
  align-items: center;
`;

const By = styled(Text)`
  font-weight: 700;
  color: ${TextGray};
  margin-right: ${rem(7)};
`;

export const OrgLink = styled(TitleLink)`
  display: unset;
  font-size: ${rem(16)};
  ${textEllipses(350)};

  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    ${textEllipses(250)}
  }
  @media (max-width: ${rem(BREAKPOINTS.xs)}) {
    ${textEllipses(175)}
  }
  @media (max-width: ${rem(350)}) {
    ${textEllipses(125)}
  }
`;

const Repos = styled.div`
  display: flex;
  flex-direction: row;
`;

const Badge = styled(GitPOAPBadge)`
  margin-top: ${rem(64)};
  cursor: default;
`;

const Links = styled.div`
  margin-top: ${rem(18)};
`;

const StyledLink = styled(IconLink)`
  margin: 0 ${rem(12)};
`;

const CheckEligibilityButton = styled(Button)`
  margin-top: ${rem(40)};
`;

const ReposContentLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReposContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ModalTitle = styled(HeaderText)`
  font-size: ${rem(32)};
`;

const MoreReposText = styled(By)`
  font-size: ${rem(16)};
`;

const ActionText = styled.div`
  color: ${PrimaryBlue};
  &:hover {
    text-decoration: underline;
    &:not(:active) {
      color: ${ExtraHover};
    }
  }
  cursor: pointer;
  display: inline-block;
`;

const StyledTable = styled(Table)`
  font-weight: 700;
  color: ${TextGray};

  td {
    white-space: nowrap;
  }
  td:last-child {
    width: 100%;
  }
`;

export const Header = ({ gitPOAPId }: Props) => {
  const { github } = useOAuthContext();
  const user = useUser();
  const hasGithubConnection = user?.capabilities.hasGithub ?? false;
  const [opened, { close, open }] = useDisclosure(false);

  const [result] = useGitPoapEventQuery({
    variables: {
      id: gitPOAPId,
    },
  });
  const event = result?.data?.gitPOAPEvent?.event;
  const repos = result?.data?.gitPOAPEvent?.gitPOAP.project?.repos;
  const { setIsOpen } = useClaimContext();
  const features = useFeatures();
  const [isCheckButtonClicked, setIsCheckButtonClicked] = useLocalStorage<boolean>({
    key: 'isCheckEligibilityButtonClicked',
    defaultValue: false,
  });

  useEffect(() => {
    if (hasGithubConnection && isCheckButtonClicked) {
      setIsOpen(true);
      setIsCheckButtonClicked(false);
    }
  }, [hasGithubConnection, isCheckButtonClicked]);

  return (
    <Wrapper>
      <Badge
        altText={event?.name.replace('GitPOAP: ', '') ?? ''}
        size="lg"
        disableHoverEffects
        imgUrl={event?.image_url ?? ''}
      />
      <TitleStyled>{event?.name.replace('GitPOAP: ', '')}</TitleStyled>
      <Description>{event?.description}</Description>
      {repos && (
        <>
          <Repos>
            <ReposContentLeft>
              <By>{`by `}</By>
            </ReposContentLeft>
            <ReposContentRight>
              {repos.slice(0, repos.length > 5 ? 4 : 5).map((repo) => (
                <RepoName key={`repo-${repo.id}`}>
                  <OrgLink
                    href={`/gh/${repo.organization.name}`}
                  >{`${repo.organization.name}`}</OrgLink>
                  {`/`}
                  <OrgLink href={`/gh/${repo.organization.name}/${repo.name}`}>{repo.name}</OrgLink>
                </RepoName>
              ))}
              {repos.length > 5 && (
                <MoreReposText>
                  {'and '}
                  <ActionText onClick={open}>{` ${repos.length - 4} more`}</ActionText>
                </MoreReposText>
              )}
            </ReposContentRight>
          </Repos>

          <Links>
            {features.hasOrganizations && repos[0].organization.twitterHandle && (
              <StyledLink
                href={`https://twitter.com/${repos[0].organization.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={24} />
              </StyledLink>
            )}
            {features.hasOrganizations && repos[0].organization.url && (
              <StyledLink
                href={repos[0].organization.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon size={24} />
              </StyledLink>
            )}
          </Links>
          <Modal
            centered
            opened={opened}
            onClose={close}
            title={<ModalTitle>{event?.name.replace('GitPOAP: ', '')}</ModalTitle>}
          >
            <StyledTable>
              {repos.map((repo, i) => (
                <tr key={`modalRepo-${repo.id}`}>
                  <td>
                    <Index order={3}>{`${i + 1}:`}</Index>
                  </td>
                  <td style={{ paddingLeft: rem(8) }}>
                    <OrgLink href={`/gh/${repo.organization.name}/${repo.name}`}>
                      {repo.name}
                    </OrgLink>
                  </td>
                </tr>
              ))}
            </StyledTable>
          </Modal>
        </>
      )}
      <CheckEligibilityButton
        onClick={() => {
          if (!hasGithubConnection) {
            setIsCheckButtonClicked(true);
            github.authorize();
          } else {
            setIsOpen(true);
          }
        }}
        leftIcon={<GithubIcon size={20} />}
      >
        {"Check If I'm Eligible"}
      </CheckEligibilityButton>
    </Wrapper>
  );
};
