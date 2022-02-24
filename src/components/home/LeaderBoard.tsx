import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Header } from '../shared/elements/Header';
import { BackgroundPanel2, TextAccent } from '../../colors';
import { Avatar } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { Divider as DividerUI } from '@mantine/core';

type Props = {
  title: string;
  data: LeaderBoardItemProps[];
};

type LeaderBoardItemProps = {
  imgSrc: string;
  name: string;
  count: number;
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(22)};
  letter-spacing: ${rem(0.5)};
  color: ${TextAccent};
`;

const AvatarStyled = styled(Avatar)`
  height: ${rem(32)};
  width: ${rem(32)};
  margin-right: ${rem(14)};
`;

const Item = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${rem(16)} ${rem(20)};
`;

const HeaderStyled = styled(Header)`
  font-size: ${rem(30)};
  line-height: ${rem(30)};
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

const LeaderBoardItem = ({ name, imgSrc, count }: LeaderBoardItemProps) => {
  return (
    <>
      <Item>
        <UserInfo>
          <AvatarStyled src={imgSrc} />
          <Name>{name}</Name>
        </UserInfo>
        <IconCount icon={<GitPOAP />} count={count} />
      </Item>
      <Divider />
    </>
  );
};

export const LeaderBoard = ({ title, data }: Props) => {
  return (
    <Wrapper>
      <HeaderStyled>{title}</HeaderStyled>
      {data.map((item: LeaderBoardItemProps) => (
        <LeaderBoardItem key={item.name} {...item} />
      ))}
    </Wrapper>
  );
};