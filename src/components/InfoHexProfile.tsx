import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { TextAccent, TextLight, ExtraHover, ExtraPressed } from '../colors';
import { Twitter } from './shared/elements/icons/Twitter';
import { GitHub } from './shared/elements/icons/GitHub';
import { GitPOAP } from './shared/elements/icons/GitPOAP';
import { InfoHexBase, Body } from './shared/elements/InfoHexBase';

type Props = {
  imgSrc: string;
  name: string;
  blurb: string;
  gitpoapId: string | number;
  twitterHref?: string;
  githubHref?: string;
  numGitPOAPs: number;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${rem(200)};
  padding: 0 ${rem(17)};
`;

const Avatar = styled.img`
  height: ${rem(80)};
  width: ${rem(80)};
  border-radius: 50%;
  margin-bottom: ${rem(14)};

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Name = styled.div`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(24)};
  line-height: ${rem(26)};
  text-align: center;
  letter-spacing: ${rem(-1)};
  color: ${TextAccent};
  margin-bottom: ${rem(14)};
  transition: 150ms color ease;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Blurb = styled.div`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(11)};
  line-height: ${rem(16)};
  text-align: center;
  letter-spacing: ${rem(-0.1)};
  color: ${TextLight};

  flex: none;
  order: 2;
  flex-grow: 0;
  max-width: ${rem(180)};
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${rem(14)};
  > *:not(:last-child) {
    margin-right: ${rem(16)};
  }
  flex: none;
  order: 3;
  flex-grow: 0;
`;

const GPCount = styled.span`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(12)};
  line-height: ${rem(17)};
  letter-spacing: ${rem(0.5)};
  text-transform: uppercase;
  color: ${TextLight};
  margin-left: ${rem(6)};
`;

const StyledInfoHex = styled(InfoHexBase)`
  display: inline-flex;
  flex-direction: column;
  min-width: ${rem(215)};

  ${Body}:hover {
    ${Name} {
      color: ${ExtraHover};
    }
  }

  ${Body}:active {
    ${Name} {
      color: ${ExtraPressed};
    }
  }
`;

const getGitPOAPHref = (gitpoapId: string | number) => {
  return `https://gitpoap.io/@${gitpoapId}`;
};

export const InfoHexProfile = ({
  imgSrc,
  name,
  blurb,
  gitpoapId,
  twitterHref,
  githubHref,
  numGitPOAPs,
}: Props) => {
  return (
    <StyledInfoHex>
      <Content>
        <Avatar src={imgSrc} />
        <Name>{name}</Name>
        <Blurb>{blurb}</Blurb>
        <Social>
          {twitterHref && <Twitter href={twitterHref} />}
          {githubHref && <GitHub href={githubHref} />}
          <div>
            {gitpoapId && <GitPOAP href={getGitPOAPHref(gitpoapId)} />}
            <GPCount>{numGitPOAPs}</GPCount>
          </div>
        </Social>
      </Content>
    </StyledInfoHex>
  );
};