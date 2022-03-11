import styled from 'styled-components';
import { rem } from 'polished';
import { RadioGroup as RadioGroupUI } from '@mantine/core';
import {
  BackgroundPanel,
  BackgroundPanel2,
  ExtraHover,
  ExtraPressed,
  TextAccent,
} from '../../../colors';

export const RadioGroup = styled(RadioGroupUI)`
  .mantine-RadioGroup-radio {
    transition: 150ms border-color ease;
    background-color: ${BackgroundPanel};
    border: ${rem(1)} solid ${BackgroundPanel2};
    &::before {
      transition: 150ms background-color ease;
      background-color: ${TextAccent};
    }

    &:hover:not(.mantine-RadioGroup-radioDisabled) {
      cursor: pointer;
    }
  }

  .mantine-RadioGroup-label {
    transition: 150ms color ease;
    font-family: PT Mono;
    font-style: normal;
    font-weight: normal;
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    letter-spacing: ${rem(0.2)};

    &:hover:not(.mantine-RadioGroup-labelDisabled) {
      color: ${ExtraHover};
      cursor: pointer;
      .mantine-RadioGroup-radio {
        border-color: ${ExtraHover};
      }
    }

    &:active:not(.mantine-RadioGroup-labelDisabled) {
      color: ${ExtraPressed};
      .mantine-RadioGroup-radio {
        border-color: ${ExtraPressed};
        &::before {
          background-color: ${ExtraPressed};
        }
      }
    }
  }
`;
