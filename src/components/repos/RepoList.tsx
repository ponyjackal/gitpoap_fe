import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ItemList, SelectOption } from '../shared/compounds/ItemList';
import { Header } from '../shared/elements/Header';
import { RepoHex, RepoHexSkeleton } from './RepoHex';
import { Input } from '../shared/elements';
import {
  AllReposOnRepoPageQuery,
  useAllReposOnRepoPageQuery,
  useTotalRepoCountQuery,
  AllReposOnRepoPageQueryVariables,
} from '../../graphql/generated-gql';
import { useListState } from '@mantine/hooks';

type SortOptions = 'alphabetical' | 'date' | 'gitpoap-count' | 'organization';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'date', label: 'Creation Date' },
  { value: 'gitpoap-count', label: 'GitPOAP Count' },
  { value: 'organization', label: 'Organization' },
];

const RepoListContainer = styled.div`
  display: grid;
  column-gap: ${rem(30)};
  row-gap: ${rem(32)};
  grid-template-columns: repeat(auto-fill, ${rem(280)});
  justify-content: center;
  align-content: center;
  margin: ${rem(50)} 0;
  align-items: flex-start;
`;

const StyledHeader = styled(Header)`
  display: block;
  margin-bottom: ${rem(40)};
`;

const Wrapper = styled.div`
  margin-top: ${rem(80)};
  text-align: center;
`;

const StyledItemList = styled(ItemList)`
  margin-bottom: ${rem(50)};
`;

export type Repo = Exclude<AllReposOnRepoPageQuery['allRepos'], undefined | null>[number];

type QueryVars = {
  page: number;
  perPage: number;
  sort: SortOptions;
};

export const RepoList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [variables, setVariables] = useState<QueryVars>({
    page: 1,
    perPage: 20,
    sort: 'gitpoap-count',
  });
  const [repoListItems, handlers] = useListState<Repo>([]);
  const [result] = useAllReposOnRepoPageQuery({ variables });
  const [totalResult] = useTotalRepoCountQuery({});
  const total = totalResult.data?.totalRepos;
  const allRepos = result.data?.allRepos;

  // Assert type until following issue is resolved:
  // https://github.com/dotansimha/graphql-code-generator/issues/7976
  const queryVariables = result.operation?.variables as
    | AllReposOnRepoPageQueryVariables
    | undefined;

  /* Hook to append new data onto existing list of repos */
  useEffect(() => {
    const resultPage = queryVariables?.page;
    if (allRepos) {
      const newRepoListItems = allRepos;
      if (resultPage === 1) {
        handlers.setState(newRepoListItems);
      } else {
        handlers.append(...newRepoListItems);
      }
    }
    /* Do not include handlers below */
  }, [allRepos, queryVariables]);

  if (result.error) {
    return null;
  }

  return (
    <Wrapper>
      <StyledHeader>{`${total ?? ''} Repos`}</StyledHeader>
      <Input
        style={{ marginBottom: rem(40), width: rem(400) }}
        placeholder={'SEARCH FOR A REPO...'}
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
      />
      <StyledItemList
        selectOptions={selectOptions}
        selectValue={variables.sort}
        onSelectChange={(sortValue) => {
          if (sortValue !== variables.sort) {
            setVariables({
              ...variables,
              sort: sortValue as SortOptions,
              page: 1,
            });
          }
        }}
        isLoading={result.fetching}
        hasShowMoreButton={!!total && repoListItems.length < total && repoListItems.length > 0}
        showMoreOnClick={() => {
          if (!result.fetching) {
            setVariables({
              ...variables,
              page: variables.page + 1,
            });
          }
        }}
      >
        <RepoListContainer>
          {result.fetching && !result.operation && repoListItems.length === 0 && (
            <>
              {[...Array(5)].map((_, i) => (
                <RepoHexSkeleton key={i} />
              ))}
            </>
          )}

          {repoListItems &&
            repoListItems
              .filter((repo) => {
                if (searchValue) {
                  return repo.name.toLowerCase().includes(searchValue.toLowerCase());
                }
                return true;
              })
              .map((repo, i) => {
                return <RepoHex key={'repo-' + i} repo={repo} />;
              })}
        </RepoListContainer>
      </StyledItemList>
    </Wrapper>
  );
};