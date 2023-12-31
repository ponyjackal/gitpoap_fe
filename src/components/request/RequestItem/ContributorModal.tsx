import { Badge, Group, Modal, Stack } from '@mantine/core';
import { rem } from 'polished';
import { useMemo } from 'react';
import { shortenAddress } from '../../../helpers';
import { ContributorsObject, UnvalidatedContributor } from '../../../lib/api/gitpoapRequest';
import { convertContributorsObjectToList } from '../../create/convertContributorsObjectToList';
import { Text, Header } from '../../shared/elements';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  contributors: ContributorsObject;
};

const contributorTypeCopy = {
  githubHandles: 'GitHub',
  ethAddresses: 'ETH',
  ensNames: 'ENS',
  emails: 'Email',
  invalid: 'Invalid',
};

export const ContributorModal = ({ isOpen, onClose, contributors }: Props) => {
  const generateContributorsList: UnvalidatedContributor[] = useMemo(
    () => convertContributorsObjectToList(contributors),
    [contributors],
  );

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      title={<Header style={{ fontSize: rem(30) }}>{'Contributors'}</Header>}
    >
      <Stack>
        {generateContributorsList.map((contributor, index) => {
          const { type, value } = contributor;
          return (
            <Group key={`${index}-contributor-list`}>
              <Text>{`${type === 'ethAddresses' ? shortenAddress(value, 4) : value}`}</Text>
              <Badge>{contributorTypeCopy[type]}</Badge>
            </Group>
          );
        })}
      </Stack>
    </Modal>
  );
};
