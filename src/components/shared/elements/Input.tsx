import styled, { css } from 'styled-components';
import { rem } from 'polished';
import {
  TextGray,
  DarkGray,
  BackgroundPanel,
  TextDarkGray,
  TextLight,
  BackgroundPanel2,
  ExtraRed,
} from '../../../colors';
import { TextInput } from '@mantine/core';

type Props = {
  className?: string;
  placeholder?: string;
  onChange: React.ComponentProps<typeof TextInput>['onChange'];
  disabled?: boolean;
  value: string;
  error?: React.ComponentProps<typeof TextInput>['error'];
  size?: React.ComponentProps<typeof TextInput>['size'];
  label?: React.ComponentProps<typeof TextInput>['label'];
  required?: React.ComponentProps<typeof TextInput>['required'];
};

export const TextInputLabelStyles = css<{ disabled?: boolean }>`
  font-family: 'PT Mono', monospace;
  color: ${TextLight};
  font-weight: 700;
  font-size: ${rem(11)};
  text-transform: uppercase;
  letter-spacing: ${rem(1.2)};
  line-height: ${rem(18)};
  margin-bottom: ${rem(11)};
  ${(props) => props.disabled && `color: ${TextGray}`};
`;

const StyledInputBase = styled(TextInput)<{ disabled?: boolean }>`
  display: inline-block;

  .mantine-TextInput-label {
    ${TextInputLabelStyles};
  }

  .mantine-TextInput-input {
    border-radius: ${rem(6)};
    font-family: 'PT Mono', monospace;
    font-weight: 400;
    font-size: ${rem(14)};
    color: white;
    background-color: ${BackgroundPanel};
    transition: 150ms background-color ease;
    letter-spacing: ${rem(0.2)};

    &:hover:not(:disabled):not(:focus) {
      background-color: ${BackgroundPanel2};
    }
    &:focus {
      background-color: ${BackgroundPanel};
      /* Must use !important since Mantine is using it */
      border: ${rem(1)} solid ${DarkGray} !important;
    }
    &::placeholder {
      color: ${TextDarkGray};
    }
    &.mantine-TextInput-invalid {
      color: ${ExtraRed};
    }
  }

  .mantine-TextInput-error {
    font-family: 'PT Mono', monospace;
    font-size: ${rem(10)};
    letter-spacing: 1.2px;
    padding-left: ${rem(16)};

    /* Must !important since Mantine is using it */
    color: ${ExtraRed} !important;
  }
`;

export const Input = (props: Props) => {
  return <StyledInputBase {...props} />;
};
