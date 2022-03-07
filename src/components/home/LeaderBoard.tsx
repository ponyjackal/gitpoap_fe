import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useQuery, gql } from 'urql';
import { Header } from '../shared/elements/Header';
import { BackgroundPanel2 } from '../../colors';
import { Avatar } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { Divider as DividerUI } from '@mantine/core';
import { Title } from '../shared/elements/Title';

export type LeaderBoardItemProps = {
  claimsCount: number;
  user: {
    githubHandle: string;
    id: number;
  };
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Name = styled(Title)`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(22)};
`;

const AvatarStyled = styled(Avatar)`
  height: ${rem(40)};
  width: ${rem(40)};
  margin-right: ${rem(14)};
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${rem(16)} ${rem(20)};
`;

const HeaderStyled = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(48)};
`;

const UserInfo = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
`;

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};

  &:last-child {
    display: none;
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
`;

const LeadersQuery = gql`
  query leaders {
    lastWeekMostHonoredContributors(count: 10) {
      user {
        id
        githubHandle
      }
      claimsCount
    }
  }
`;

const LeaderBoardItem = ({ user, claimsCount }: LeaderBoardItemProps) => {
  const imgSrc = `https://github.com/${user.githubHandle}.png?size=200`;

  return (
    <>
      <Item>
        <UserInfo>
          <AvatarStyled src={imgSrc} />
          <a href={`https://github.com/${user.githubHandle}`} target="_blank" rel="noreferrer">
            <Name>{user.githubHandle}</Name>
          </a>
        </UserInfo>
        <IconCount icon={<GitPOAP />} count={claimsCount} />
      </Item>
      <Divider />
    </>
  );
};

export const LeaderBoard = () => {
  const [result] = useQuery<{
    lastWeekMostHonoredContributors: LeaderBoardItemProps[];
  }>({
    query: LeadersQuery,
  });

  return (
    <Wrapper>
      <HeaderStyled>{'Most honored contributors last week'}</HeaderStyled>
      <List>
        {result.data?.lastWeekMostHonoredContributors.map((item: LeaderBoardItemProps) => (
          <LeaderBoardItem key={item.user.githubHandle} {...item} />
        ))}
      </List>
    </Wrapper>
  );
};
