import React, { useEffect } from 'react';
import { Group, Popover } from '@mantine/core';
import { Button } from './shared/elements/Button';

const POPOVER_HOVER_TIME = 400;

type DisconnectPopoverProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  target: React.ReactNode;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onClose: () => void;
  handleOnClick: () => void;
  icon: React.ReactNode;
  buttonText: string;
  isHovering: boolean;
};

export const DisconnectPopover = ({
  isOpen,
  setIsOpen,
  target,
  onMouseEnter,
  onMouseLeave,
  handleOnClick,
  onClose,
  icon,
  buttonText,
  isHovering,
}: DisconnectPopoverProps) => {
  /* Opens & closes the popover on hover with a time delay */
  useEffect(() => {
    if (isHovering && !isOpen) {
      const timeout = setTimeout(() => setIsOpen(true), POPOVER_HOVER_TIME);
      return () => clearTimeout(timeout);
    }
    if (!isHovering && isOpen) {
      const timeout = setTimeout(() => setIsOpen(false), POPOVER_HOVER_TIME);
      return () => clearTimeout(timeout);
    }
  }, [isHovering, isOpen, setIsOpen]);

  return (
    <Popover
      opened={isOpen}
      onClose={onClose}
      target={target}
      position="bottom"
      placement="center"
      closeOnClickOutside
      trapFocus={false}
      spacing={6}
      withArrow
      radius="md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Group>
        <Button variant="outline" onClick={handleOnClick} rightIcon={icon}>
          {buttonText}
        </Button>
      </Group>
    </Popover>
  );
};