import React, { useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Center, Popover } from '@mantine/core';
import { BackgroundPanel2, ExtraHover, ExtraRed, TextLight } from '../../colors';
import { FaQuestionCircle } from 'react-icons/fa';
import { DateTime } from 'luxon';

/* Add more types to this if need be */
export type AcceptedDataTypes = string | number | File | Date | boolean | null | undefined;

type DataPopoverProps = {
  data: Record<string, AcceptedDataTypes>;
};

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${rem(450)};
`;

const DataEntry = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${rem(3)};
  > span {
    &:not(:last-child) {
      margin-right: ${rem(10)};
    }
  }
`;

const StyledFaQuestionCircle = styled(FaQuestionCircle)`
  cursor: pointer;
  transition: 150ms color ease;
  &:hover {
    color: ${ExtraHover};
  }
`;

const FieldName = styled.span<{ hasValue: boolean }>`
  color: ${({ hasValue }) => (hasValue ? TextLight : ExtraRed)};
`;

const printValue = (value: AcceptedDataTypes) => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (value instanceof Date) {
    return DateTime.fromJSDate(value).toFormat('dd LLL yyyy');
  }
  if (value instanceof File) {
    return value.name;
  }

  return '';
};

export const DataPopover = ({ data }: DataPopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  return (
    <Popover
      opened={isPopoverOpen}
      onClose={() => setIsPopoverOpen(false)}
      position="left"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="pop-top-left"
      styles={{
        dropdown: {
          pointerEvents: 'none',
          backgroundColor: BackgroundPanel2,
          borderColor: BackgroundPanel2,
        },
      }}
      radius="lg"
    >
      <Popover.Target>
        <Center>
          <StyledFaQuestionCircle
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
            size={20}
          />
        </Center>
      </Popover.Target>
      <Popover.Dropdown>
        <DataContainer>
          {Object.entries(data).map(([key, value]) => {
            const hasValue = value !== null && value !== undefined && value !== '';
            return (
              <DataEntry key={key}>
                {/* Account for boolean false being a valid value */}
                <FieldName hasValue={hasValue}>
                  <b>{`${key}:`}</b>
                </FieldName>
                <span>{` ${printValue(value)}`}</span>
              </DataEntry>
            );
          })}
        </DataContainer>
      </Popover.Dropdown>
    </Popover>
  );
};
