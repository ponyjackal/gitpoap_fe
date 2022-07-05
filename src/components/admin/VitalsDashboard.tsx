import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { DateTime } from 'luxon';
import {
  useClaimsSinceQuery,
  useGitPoaPsSinceQuery,
  useOrgsSinceQuery,
  useProfilesSinceQuery,
  useReposSinceQuery,
} from '../../graphql/generated-gql';
import { Header } from '../shared/elements';
import { Group } from '@mantine/core';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${rem(4)};
`;

const ItemName = styled.div``;

const ItemValue = styled.div``;

const Dashboard = styled.div`
  width: ${rem(500)};
`;

const HeaderContainer = styled.div`
  margin-bottom: ${rem(20)};
  margin-top: ${rem(20)};
`;

type ItemProps = {
  name: string;
  value?: string | number;
};

const DashboardItem = ({ name, value }: ItemProps) => {
  return (
    <ItemContainer>
      <ItemName>{`${name}: `}</ItemName>
      <ItemValue>{value}</ItemValue>
    </ItemContainer>
  );
};

export const VitalsDashboard = () => {
  const todayMinus7Days = DateTime.local().minus({ days: 7 }).toFormat('yyyy-MM-dd');
  const today = DateTime.local().toFormat('yyyy-MM-dd');
  const [claimsResult] = useClaimsSinceQuery({
    variables: { date: todayMinus7Days },
  });
  const [dailyClaimsResult] = useClaimsSinceQuery({
    variables: { date: today },
  });
  const [reposResult] = useReposSinceQuery({
    variables: { date: todayMinus7Days },
  });
  const [orgsResult] = useOrgsSinceQuery({ variables: { date: todayMinus7Days } });
  const [gitPOAPsResult] = useGitPoaPsSinceQuery({
    variables: { date: todayMinus7Days },
  });
  const [profilesResult] = useProfilesSinceQuery({
    variables: { date: todayMinus7Days },
  });

  return (
    <Group direction="row" position="center">
      <Group direction="column">
        <Dashboard>
          <HeaderContainer>
            <Header>{'Vitals Dashboard'}</Header>
          </HeaderContainer>
          <DashboardItem name={'Mints (last 7 days)'} value={claimsResult.data?.claims.length} />
          <DashboardItem name={'Mints (today)'} value={dailyClaimsResult.data?.claims.length} />
          <DashboardItem
            name={'Repos Added (last 7 days)'}
            value={reposResult.data?.repos.length}
          />
          <DashboardItem
            name={'Orgs Added (last 7 days)'}
            value={orgsResult.data?.organizations.length}
          />
          <DashboardItem
            name={'GitPOAPs Added (last 7 days)'}
            value={gitPOAPsResult.data?.gitPOAPS.length}
          />
          <DashboardItem
            name={'Profiles Added (last 7 days)'}
            value={profilesResult.data?.profiles.length}
          />
          <DashboardItem name={'Claim %'} value={'TBD'} />
        </Dashboard>
      </Group>
    </Group>
  );
};