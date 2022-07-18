import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaGithub as GithubIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { VscGlobe as GlobeIcon } from 'react-icons/vsc';
import { Link, IconLink } from '../Link';
import { Text, Button, Header as HeaderText, Title, GitPOAPBadge } from '../shared/elements';
import { TextAccent, TextGray, ExtraHover } from '../../colors';
import { useFeatures } from '../../components/FeaturesContext';
import { useClaimModalContext } from '../ClaimModal/ClaimModalContext';
import { useGitPoapEventQuery } from '../../graphql/generated-gql';

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
`;

const TitleStyled = styled(HeaderText)`
  margin-top: ${rem(24)};
`;

const Description = styled(Text)`
  margin-top: ${rem(16)};
  font-size: ${rem(16)};
  margin-bottom: ${rem(30)};
`;

export const OrgName = styled(Text)`
  font-weight: 700;
  color: ${TextGray};
  margin-bottom: ${rem(7)};
`;

export const OrgLink = styled(Title)`
  font-size: ${rem(16)};
  color: ${TextAccent};
`;

const Repos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

export const Header = ({ gitPOAPId }: Props) => {
  const [result] = useGitPoapEventQuery({
    variables: {
      id: gitPOAPId,
    },
  });
  const event = result?.data?.gitPOAPEvent?.event;
  const repos = result?.data?.gitPOAPEvent?.gitPOAP.project.repos;
  const { setIsOpen } = useClaimModalContext();
  const features = useFeatures();

  return (
    <Wrapper>
      <Badge size="lg" disableHoverEffects imgUrl={event?.image_url ?? ''} />
      <TitleStyled>{event?.name.replace('GitPOAP: ', '')}</TitleStyled>
      <Description>{event?.description}</Description>
      {repos && (
        <>
          <Repos>
            {repos.map((repo, i) => (
              <OrgName key={repo.id}>
                {i === 0 && `by `}
                <Link href={`/gh/${repo.organization.name}`} passHref>
                  <OrgLink>{`${repo.organization.name}`}</OrgLink>
                </Link>
                {`/`}
                <Link href={`/gh/${repo.organization.name}/${repo.name}`} passHref>
                  <OrgLink>{repo.name}</OrgLink>
                </Link>
              </OrgName>
            ))}
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
        </>
      )}
      <CheckEligibilityButton onClick={() => setIsOpen(true)} leftIcon={<GithubIcon size={20} />}>
        {"Check If I'm Eligible"}
      </CheckEligibilityButton>
    </Wrapper>
  );
};
