import React from 'react';
import { MdDelete } from 'react-icons/md';
import { DateTime } from 'luxon';
import { TeamMembershipsQuery } from '../../../../graphql/generated-gql';
import { AcceptanceStatusBadge } from './AcceptanceStatusBadge';
import { shortenAddress } from '../../../../helpers';
import { Button, Text, RelativeDate } from '../../../shared/elements';
import { Link } from '../../../shared/compounds/Link';

type TeamMemberships = Exclude<TeamMembershipsQuery['teamMemberships'], undefined | null>;

export type Address = TeamMemberships['memberships'][number]['address'];

type RowProps = {
  teamId: number;
  membership: TeamMemberships['memberships'][number];
  openRemoveModal: (membershipId: number, address: Address) => void;
};

export const MembershipRow = ({ membership, openRemoveModal }: RowProps) => {
  const { id, role, acceptanceStatus, joinedOn, address } = membership;

  return (
    <>
      <tr>
        <td>
          <AcceptanceStatusBadge status={acceptanceStatus} />
        </td>
        <td>
          <Link href={`/p/${address.ethAddress}`}>
            <Text lineClamp={3} variant="link">
              {address.ensName ?? shortenAddress(address.ethAddress)}
            </Text>
          </Link>
        </td>
        <td>
          <Text lineClamp={3}>{role}</Text>
        </td>
        <td>
          <RelativeDate sx={{ whiteSpace: 'nowrap' }} date={DateTime.fromISO(joinedOn)} />
        </td>
        <td>
          <Button onClick={() => openRemoveModal(id, address)} compact>
            <MdDelete />
          </Button>
        </td>
      </tr>
    </>
  );
};