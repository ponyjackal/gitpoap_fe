import React from 'react';
import { rem } from 'polished';
import { Group } from '@mantine/core';
import { Button } from '../shared/elements';
import { AcceptedDataTypes, DataPopover } from './DataPopover';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

export enum ButtonStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

type Props = {
  data: Record<string, AcceptedDataTypes>;
  clearData: () => void;
  buttonStatus: ButtonStatus;
  onSubmit: () => void;
};

export const CreateButtonRow = ({ clearData, buttonStatus, data, onSubmit }: Props) => {
  return (
    <Group
      direction="row"
      position="left"
      align="center"
      style={{ marginTop: rem(20), marginBottom: rem(20) }}
    >
      <Button
        onClick={clearData}
        disabled={[ButtonStatus.LOADING].includes(buttonStatus)}
        variant="outline"
      >
        {'Clear'}
      </Button>
      <Button
        onClick={onSubmit}
        loading={buttonStatus === ButtonStatus.LOADING}
        disabled={buttonStatus === ButtonStatus.SUCCESS || buttonStatus === ButtonStatus.LOADING}
        leftIcon={
          buttonStatus === ButtonStatus.SUCCESS ? (
            <FaCheckCircle size={18} />
          ) : buttonStatus === ButtonStatus.ERROR ? (
            <MdError size={18} />
          ) : null
        }
      >
        {'Submit'}
      </Button>
      <DataPopover data={data} />
    </Group>
  );
};
