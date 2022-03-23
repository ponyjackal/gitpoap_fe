import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useClipboard } from '@mantine/hooks';
import { FiCopy } from 'react-icons/fi';
import { Tooltip } from './Tooltip';
import { Title } from './Title';
import { TextGray } from '../../../colors';

type Props = {
  className?: string;
  text: string;
  textToCopy: string;
};

const CopyableTextStyled = styled(Title)`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(14)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(-0.5)};
  color: ${TextGray};
`;

export const CopyableText = ({ className, text, textToCopy }: Props) => {
  const clipboard = useClipboard({ timeout: 1500 });

  return (
    <CopyableTextStyled className={className} onClick={() => clipboard.copy(textToCopy)}>
      {text}
      <Tooltip opened={clipboard.copied} label="Copied!" withArrow position="right" placement="end">
        <FiCopy style={{ marginLeft: rem(6) }} />
      </Tooltip>
    </CopyableTextStyled>
  );
};
