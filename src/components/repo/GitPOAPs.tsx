import React, { useState, useEffect } from 'react';
import { rem } from 'polished';
import { Grid, Group } from '@mantine/core';
import { GitPOAP as GitPOAPBadge } from '../shared/compounds/GitPOAP';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { POAPBadgeSkeleton } from '../shared/elements/Skeletons';
import { Title } from '../shared/elements/Title';
import { FaTrophy } from 'react-icons/fa';
import { TextDarkGray } from '../../colors';
import { EmptyState } from '../shared/compounds/ItemListEmptyState';
import { RepoGitPoapsQuery, useRepoGitPoapsQuery } from '../../graphql/generated-gql';

type Props = {
  repoId: number;
};

type SortOptions = 'date' | 'alphabetical';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'date', label: 'Mint Date' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

type RepoGitPOAPItems = Exclude<RepoGitPoapsQuery['repoGitPOAPs'], undefined | null>['gitPOAPs'];

export const GitPOAPs = ({ repoId }: Props) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOptions>('date');
  const [gitPOAPItems, setGitPOAPItems] = useState<RepoGitPOAPItems>([]);
  const [total, setTotal] = useState<number>();
  const perPage = 10;

  const [result] = useRepoGitPoapsQuery({
    variables: {
      repoId,
      page,
      perPage,
      sort,
    },
  });

  /* If the repoId of the repo being looked at changes, clear the data we've saved */
  useEffect(() => {
    setGitPOAPItems([]);
  }, [repoId]);

  /* Hook to append new data onto existing list of gitPOAPs */
  useEffect(() => {
    setGitPOAPItems((prev: RepoGitPOAPItems) => {
      if (result.data?.repoGitPOAPs) {
        return [...prev, ...result.data.repoGitPOAPs.gitPOAPs];
      }
      return prev;
    });
  }, [result.data]);

  /* Hook to set total number of GitPOAPs */
  useEffect(() => {
    if (result.data?.repoGitPOAPs) {
      setTotal(result.data.repoGitPOAPs.totalGitPOAPs);
    }
  }, [result.data]);

  if (result.error) {
    return null;
  }

  return (
    <ItemList
      title={`GitPOAPs: ${total ?? ''}`}
      selectOptions={selectOptions}
      selectValue={sort}
      onSelectChange={(sortValue) => {
        if (sortValue !== sort) {
          setSort(sortValue as SortOptions);
          setGitPOAPItems([]);
          setPage(1);
        }
      }}
      isLoading={result.fetching}
      hasShowMoreButton={!!total && gitPOAPItems.length < total && gitPOAPItems.length > 0}
      showMoreOnClick={() => {
        if (!result.fetching) {
          setPage(page + 1);
        }
      }}
    >
      <Grid align="start">
        {result.fetching && !result.operation && (
          <>
            {[...Array(5)].map((_, i) => {
              return (
                <POAPBadgeSkeleton key={i} style={{ marginTop: rem(30), marginRight: rem(40) }} />
              );
            })}
          </>
        )}
        {result.operation && gitPOAPItems.length === 0 && (
          <EmptyState icon={<FaTrophy color={TextDarkGray} size={rem(74)} />}>
            <a href={'https://gitpoap.io/discord'} target="_blank" rel="noopener noreferrer">
              <Title style={{ marginTop: rem(20) }}>
                {'Get contributing! Head over to our Discord to get started.'}
              </Title>
            </a>
          </EmptyState>
        )}

        {/* Fully Claimed GitPOAPs rendered next */}
        {gitPOAPItems.map((gitPOAPItem) => (
          <Grid.Col key={`${gitPOAPItem.gitPOAP.id}-minting`} sm={6} md={4} lg={3} xl={2}>
            <Group position="center">
              <GitPOAPBadge
                gitPOAPId={gitPOAPItem.gitPOAP.id}
                repoName={gitPOAPItem.gitPOAP.project?.repos[0].name}
                name={gitPOAPItem.event.name}
                imgSrc={gitPOAPItem.event.image_url}
              />
            </Group>
          </Grid.Col>
        ))}
      </Grid>
    </ItemList>
  );
};
