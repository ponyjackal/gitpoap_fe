import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { GitPOAPLogoNoText } from './shared/elements/icons';
import { BackgroundPanel, BackgroundPanel2, ExtraHover, ExtraPressed } from '../colors';
import { Popover } from '@mantine/core';
import { Text } from './shared/elements';

const StyledLogo = styled(GitPOAPLogoNoText)`
  height: ${rem(45)};
  width: ${rem(45)};
  transition: transform 200ms ease-in-out;
  path {
    transition: fill 200ms ease-in-out;
  }
`;

const CircleButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${rem(70)};
  width: ${rem(70)};
  background-color: ${BackgroundPanel};
  transition: background-color 200ms ease-in-out, transform 200ms ease-in-out;
  border-radius: 50%;
  border: ${rem(3)} solid ${BackgroundPanel2};
  &:hover {
    background-color: ${BackgroundPanel2};
    transform: scale(1.1);
    cursor: pointer;
    ${StyledLogo} {
      transform: scale(1.1);
      path {
        fill: ${ExtraHover};
      }
    }
  }
  &:active {
    background-color: ${BackgroundPanel};
    ${StyledLogo} {
      color: ${ExtraHover};
      path {
        fill: ${ExtraPressed};
      }
    }
  }
`;

const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type Props = {
  className?: string;
  href: string;
};

export const FeedbackButton = ({ className, href }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      className={className}
      styles={{ root: { zIndex: 100 } }}
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      position="top"
      placement="center"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="fade"
      transitionDuration={200}
      radius="lg"
      target={
        <CircleButton
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <StyledLogo />
        </CircleButton>
      }
    >
      <PopoverContainer>
        <Text>{'Give Feedback'}</Text>
      </PopoverContainer>
    </Popover>
  );
};
