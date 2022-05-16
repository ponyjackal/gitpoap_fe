import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type Claim = {
  __typename?: 'Claim';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  gitPOAP: GitPoap;
  gitPOAPId: Scalars['Int'];
  id: Scalars['Int'];
  poapTokenId?: Maybe<Scalars['String']>;
  status: ClaimStatus;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
};

export type ClaimListRelationFilter = {
  every?: InputMaybe<ClaimWhereInput>;
  none?: InputMaybe<ClaimWhereInput>;
  some?: InputMaybe<ClaimWhereInput>;
};

export type ClaimOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ClaimOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  gitPOAP?: InputMaybe<GitPoapOrderByWithRelationInput>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum ClaimScalarFieldEnum {
  Address = 'address',
  CreatedAt = 'createdAt',
  GitPoapId = 'gitPOAPId',
  Id = 'id',
  PoapTokenId = 'poapTokenId',
  QrHash = 'qrHash',
  Status = 'status',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
}

export enum ClaimStatus {
  Claimed = 'CLAIMED',
  Minting = 'MINTING',
  Pending = 'PENDING',
  Unclaimed = 'UNCLAIMED',
}

export enum ClaimType {
  Annual = 'ANNUAL',
  Manual = 'MANUAL',
  Quarterly = 'QUARTERLY',
}

export type ClaimWhereInput = {
  AND?: InputMaybe<Array<ClaimWhereInput>>;
  NOT?: InputMaybe<Array<ClaimWhereInput>>;
  OR?: InputMaybe<Array<ClaimWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gitPOAP?: InputMaybe<GitPoapRelationFilter>;
  gitPOAPId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  poapTokenId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumClaimStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type ClaimWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  poapTokenId?: InputMaybe<Scalars['String']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EnumClaimStatusFilter = {
  equals?: InputMaybe<ClaimStatus>;
  in?: InputMaybe<Array<ClaimStatus>>;
  not?: InputMaybe<NestedEnumClaimStatusFilter>;
  notIn?: InputMaybe<Array<ClaimStatus>>;
};

export type EnumClaimTypeFilter = {
  equals?: InputMaybe<ClaimType>;
  in?: InputMaybe<Array<ClaimType>>;
  not?: InputMaybe<NestedEnumClaimTypeFilter>;
  notIn?: InputMaybe<Array<ClaimType>>;
};

export type EnumGitPoapStatusFilter = {
  equals?: InputMaybe<GitPoapStatus>;
  in?: InputMaybe<Array<GitPoapStatus>>;
  not?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  notIn?: InputMaybe<Array<GitPoapStatus>>;
};

export type FeaturedPoap = {
  __typename?: 'FeaturedPOAP';
  id: Scalars['Int'];
  poapTokenId: Scalars['String'];
  profile: Profile;
  profileId: Scalars['Int'];
};

export type FeaturedPoapListRelationFilter = {
  every?: InputMaybe<FeaturedPoapWhereInput>;
  none?: InputMaybe<FeaturedPoapWhereInput>;
  some?: InputMaybe<FeaturedPoapWhereInput>;
};

export type FeaturedPoapOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FeaturedPoapOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  poapTokenId?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
};

export type FeaturedPoapPoapTokenIdProfileIdCompoundUniqueInput = {
  poapTokenId: Scalars['String'];
  profileId: Scalars['Int'];
};

export enum FeaturedPoapScalarFieldEnum {
  Id = 'id',
  PoapTokenId = 'poapTokenId',
  ProfileId = 'profileId',
}

export type FeaturedPoapWhereInput = {
  AND?: InputMaybe<Array<FeaturedPoapWhereInput>>;
  NOT?: InputMaybe<Array<FeaturedPoapWhereInput>>;
  OR?: InputMaybe<Array<FeaturedPoapWhereInput>>;
  id?: InputMaybe<IntFilter>;
  poapTokenId?: InputMaybe<StringFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<IntFilter>;
};

export type FeaturedPoapWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  poapTokenId?: InputMaybe<Scalars['String']>;
  poapTokenId_profileId?: InputMaybe<FeaturedPoapPoapTokenIdProfileIdCompoundUniqueInput>;
};

export type FullClaimData = {
  __typename?: 'FullClaimData';
  claim: Claim;
  event: PoapEvent;
};

export type FullGitPoapEventData = {
  __typename?: 'FullGitPOAPEventData';
  event: PoapEvent;
  gitPOAP: GitPoap;
};

export type GitPoap = {
  __typename?: 'GitPOAP';
  _count?: Maybe<GitPoapCount>;
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  ongoing: Scalars['Boolean'];
  poapEventId: Scalars['Int'];
  redeemCodes: Array<RedeemCode>;
  repo: Repo;
  repoId: Scalars['Int'];
  status: GitPoapStatus;
  type: ClaimType;
  updatedAt: Scalars['DateTime'];
  year: Scalars['Int'];
};

export type GitPoapClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type GitPoapRedeemCodesArgs = {
  cursor?: InputMaybe<RedeemCodeWhereUniqueInput>;
  distinct?: InputMaybe<Array<RedeemCodeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RedeemCodeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RedeemCodeWhereInput>;
};

export type GitPoapCount = {
  __typename?: 'GitPOAPCount';
  claims: Scalars['Int'];
  redeemCodes: Scalars['Int'];
};

export type GitPoapListRelationFilter = {
  every?: InputMaybe<GitPoapWhereInput>;
  none?: InputMaybe<GitPoapWhereInput>;
  some?: InputMaybe<GitPoapWhereInput>;
};

export type GitPoapOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GitPoapOrderByWithRelationInput = {
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ongoing?: InputMaybe<SortOrder>;
  poapEventId?: InputMaybe<SortOrder>;
  redeemCodes?: InputMaybe<RedeemCodeOrderByRelationAggregateInput>;
  repo?: InputMaybe<RepoOrderByWithRelationInput>;
  repoId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type GitPoapRelationFilter = {
  is?: InputMaybe<GitPoapWhereInput>;
  isNot?: InputMaybe<GitPoapWhereInput>;
};

export enum GitPoapScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Ongoing = 'ongoing',
  PoapEventId = 'poapEventId',
  PoapSecret = 'poapSecret',
  RepoId = 'repoId',
  Status = 'status',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Year = 'year',
}

export enum GitPoapStatus {
  Approved = 'APPROVED',
  RedeemRequestPending = 'REDEEM_REQUEST_PENDING',
  Unapproved = 'UNAPPROVED',
}

export type GitPoapWhereInput = {
  AND?: InputMaybe<Array<GitPoapWhereInput>>;
  NOT?: InputMaybe<Array<GitPoapWhereInput>>;
  OR?: InputMaybe<Array<GitPoapWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  ongoing?: InputMaybe<BoolFilter>;
  poapEventId?: InputMaybe<IntFilter>;
  redeemCodes?: InputMaybe<RedeemCodeListRelationFilter>;
  repo?: InputMaybe<RepoRelationFilter>;
  repoId?: InputMaybe<IntFilter>;
  status?: InputMaybe<EnumGitPoapStatusFilter>;
  type?: InputMaybe<EnumClaimTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  year?: InputMaybe<IntFilter>;
};

export type GitPoapWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  poapEventId?: InputMaybe<Scalars['Int']>;
};

export type GitPoapWithClaimsCount = {
  __typename?: 'GitPOAPWithClaimsCount';
  claimsCount: Scalars['Float'];
  event: PoapEvent;
  gitPOAP: GitPoap;
};

export type Holder = {
  __typename?: 'Holder';
  address: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  gitPOAPCount: Scalars['Float'];
  githubHandle: Scalars['String'];
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileId: Scalars['Float'];
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
};

export type Holders = {
  __typename?: 'Holders';
  holders: Array<Holder>;
  totalHolders: Scalars['Float'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumClaimStatusFilter = {
  equals?: InputMaybe<ClaimStatus>;
  in?: InputMaybe<Array<ClaimStatus>>;
  not?: InputMaybe<NestedEnumClaimStatusFilter>;
  notIn?: InputMaybe<Array<ClaimStatus>>;
};

export type NestedEnumClaimTypeFilter = {
  equals?: InputMaybe<ClaimType>;
  in?: InputMaybe<Array<ClaimType>>;
  not?: InputMaybe<NestedEnumClaimTypeFilter>;
  notIn?: InputMaybe<Array<ClaimType>>;
};

export type NestedEnumGitPoapStatusFilter = {
  equals?: InputMaybe<GitPoapStatus>;
  in?: InputMaybe<Array<GitPoapStatus>>;
  not?: InputMaybe<NestedEnumGitPoapStatusFilter>;
  notIn?: InputMaybe<Array<GitPoapStatus>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NullableProfile = {
  __typename?: 'NullableProfile';
  address: Scalars['String'];
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  featuredPOAPs: Array<FeaturedPoap>;
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Organization = {
  __typename?: 'Organization';
  _count?: Maybe<OrganizationCount>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  githubOrgId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  repos: Array<Repo>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type OrganizationReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type OrganizationCount = {
  __typename?: 'OrganizationCount';
  repos: Scalars['Int'];
};

export type OrganizationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  githubOrgId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  repos?: InputMaybe<RepoOrderByRelationAggregateInput>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type OrganizationRelationFilter = {
  is?: InputMaybe<OrganizationWhereInput>;
  isNot?: InputMaybe<OrganizationWhereInput>;
};

export enum OrganizationScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  GithubOrgId = 'githubOrgId',
  Id = 'id',
  Name = 'name',
  TwitterHandle = 'twitterHandle',
  UpdatedAt = 'updatedAt',
  Url = 'url',
}

export type OrganizationWhereInput = {
  AND?: InputMaybe<Array<OrganizationWhereInput>>;
  NOT?: InputMaybe<Array<OrganizationWhereInput>>;
  OR?: InputMaybe<Array<OrganizationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  githubOrgId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  repos?: InputMaybe<RepoListRelationFilter>;
  twitterHandle?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export type OrganizationWhereUniqueInput = {
  githubOrgId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type PoapEvent = {
  __typename?: 'POAPEvent';
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  end_date: Scalars['String'];
  event_url: Scalars['String'];
  expiry_date: Scalars['String'];
  fancy_id: Scalars['String'];
  id: Scalars['Float'];
  image_url: Scalars['String'];
  name: Scalars['String'];
  start_date: Scalars['String'];
  supply: Scalars['Float'];
  year: Scalars['Float'];
};

export type PoapToken = {
  __typename?: 'POAPToken';
  chain: Scalars['String'];
  created: Scalars['String'];
  event: PoapEvent;
  owner: Scalars['String'];
  tokenId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  _count?: Maybe<ProfileCount>;
  address: Scalars['String'];
  bannerImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  featuredPOAPs: Array<FeaturedPoap>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  personalSiteUrl?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProfileFeaturedPoaPsArgs = {
  cursor?: InputMaybe<FeaturedPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeaturedPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type ProfileCount = {
  __typename?: 'ProfileCount';
  featuredPOAPs: Scalars['Int'];
};

export type ProfileOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  bannerImageUrl?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  featuredPOAPs?: InputMaybe<FeaturedPoapOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  personalSiteUrl?: InputMaybe<SortOrder>;
  profileImageUrl?: InputMaybe<SortOrder>;
  twitterHandle?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProfileRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export enum ProfileScalarFieldEnum {
  Address = 'address',
  BannerImageUrl = 'bannerImageUrl',
  Bio = 'bio',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  PersonalSiteUrl = 'personalSiteUrl',
  ProfileImageUrl = 'profileImageUrl',
  TwitterHandle = 'twitterHandle',
  UpdatedAt = 'updatedAt',
}

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  address?: InputMaybe<StringFilter>;
  bannerImageUrl?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  featuredPOAPs?: InputMaybe<FeaturedPoapListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  personalSiteUrl?: InputMaybe<StringNullableFilter>;
  profileImageUrl?: InputMaybe<StringNullableFilter>;
  twitterHandle?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProfileWhereUniqueInput = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type ProfileWithClaimsCount = {
  __typename?: 'ProfileWithClaimsCount';
  claimsCount: Scalars['Float'];
  profile: Profile;
};

export type ProfileWithEns = {
  __typename?: 'ProfileWithENS';
  ens: Scalars['String'];
  profile: Profile;
};

export type Query = {
  __typename?: 'Query';
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  featuredPOAP?: Maybe<FeaturedPoap>;
  featuredPOAPS: Array<FeaturedPoap>;
  findFirstClaim?: Maybe<Claim>;
  findFirstFeaturedPOAP?: Maybe<FeaturedPoap>;
  findFirstGitPOAP?: Maybe<GitPoap>;
  findFirstOrganization?: Maybe<Organization>;
  findFirstProfile?: Maybe<Profile>;
  findFirstRepo?: Maybe<Repo>;
  findFirstUser?: Maybe<User>;
  gitPOAP?: Maybe<GitPoap>;
  gitPOAPEvent?: Maybe<FullGitPoapEventData>;
  gitPOAPHolders?: Maybe<Holders>;
  gitPOAPS: Array<GitPoap>;
  lastMonthClaims: Scalars['Float'];
  lastMonthContributors: Scalars['Float'];
  lastMonthGitPOAPs: Scalars['Float'];
  lastMonthRepos: Scalars['Float'];
  mostClaimedGitPOAPs?: Maybe<Array<GitPoapWithClaimsCount>>;
  mostHonoredContributors: Array<ProfileWithClaimsCount>;
  organization?: Maybe<Organization>;
  organizations: Array<Organization>;
  profile?: Maybe<Profile>;
  profileData?: Maybe<NullableProfile>;
  profileFeaturedPOAPs?: Maybe<UserFeaturedPoaPs>;
  profiles: Array<Profile>;
  recentlyAddedProjects: Array<Repo>;
  repo?: Maybe<Repo>;
  repoGitPOAPs?: Maybe<RepoGitPoaPs>;
  repoMostHonoredContributors: Array<ProfileWithClaimsCount>;
  repos: Array<Repo>;
  search: SearchResults;
  totalClaims: Scalars['Float'];
  totalContributors: Scalars['Float'];
  totalGitPOAPs: Scalars['Float'];
  totalRepos: Scalars['Float'];
  user?: Maybe<User>;
  userClaims?: Maybe<Array<FullClaimData>>;
  userPOAPs?: Maybe<UserPoaPs>;
  users: Array<User>;
};

export type QueryClaimArgs = {
  where: ClaimWhereUniqueInput;
};

export type QueryClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryFeaturedPoapArgs = {
  where: FeaturedPoapWhereUniqueInput;
};

export type QueryFeaturedPoapsArgs = {
  cursor?: InputMaybe<FeaturedPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeaturedPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type QueryFindFirstClaimArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type QueryFindFirstFeaturedPoapArgs = {
  cursor?: InputMaybe<FeaturedPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeaturedPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeaturedPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeaturedPoapWhereInput>;
};

export type QueryFindFirstGitPoapArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type QueryFindFirstOrganizationArgs = {
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrganizationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type QueryFindFirstProfileArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryFindFirstRepoArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryGitPoapArgs = {
  where: GitPoapWhereUniqueInput;
};

export type QueryGitPoapEventArgs = {
  id: Scalars['Float'];
};

export type QueryGitPoapHoldersArgs = {
  gitPOAPId: Scalars['Float'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryGitPoapsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type QueryMostClaimedGitPoaPsArgs = {
  count?: InputMaybe<Scalars['Float']>;
};

export type QueryMostHonoredContributorsArgs = {
  count?: InputMaybe<Scalars['Float']>;
};

export type QueryOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
};

export type QueryOrganizationsArgs = {
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  distinct?: InputMaybe<Array<OrganizationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type QueryProfileArgs = {
  where: ProfileWhereUniqueInput;
};

export type QueryProfileDataArgs = {
  address: Scalars['String'];
};

export type QueryProfileFeaturedPoaPsArgs = {
  address: Scalars['String'];
};

export type QueryProfilesArgs = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type QueryRecentlyAddedProjectsArgs = {
  count?: InputMaybe<Scalars['Float']>;
};

export type QueryRepoArgs = {
  where: RepoWhereUniqueInput;
};

export type QueryRepoGitPoaPsArgs = {
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  repoId: Scalars['Float'];
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryRepoMostHonoredContributorsArgs = {
  count?: InputMaybe<Scalars['Float']>;
  repoId: Scalars['Float'];
};

export type QueryReposArgs = {
  cursor?: InputMaybe<RepoWhereUniqueInput>;
  distinct?: InputMaybe<Array<RepoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RepoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RepoWhereInput>;
};

export type QuerySearchArgs = {
  text: Scalars['String'];
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUserClaimsArgs = {
  githubId: Scalars['Float'];
};

export type QueryUserPoaPsArgs = {
  address: Scalars['String'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RedeemCode = {
  __typename?: 'RedeemCode';
  code: Scalars['String'];
  gitPOAPId: Scalars['Int'];
  id: Scalars['Int'];
};

export type RedeemCodeListRelationFilter = {
  every?: InputMaybe<RedeemCodeWhereInput>;
  none?: InputMaybe<RedeemCodeWhereInput>;
  some?: InputMaybe<RedeemCodeWhereInput>;
};

export type RedeemCodeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RedeemCodeOrderByWithRelationInput = {
  code?: InputMaybe<SortOrder>;
  gitPOAP?: InputMaybe<GitPoapOrderByWithRelationInput>;
  gitPOAPId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export enum RedeemCodeScalarFieldEnum {
  Code = 'code',
  GitPoapId = 'gitPOAPId',
  Id = 'id',
}

export type RedeemCodeWhereInput = {
  AND?: InputMaybe<Array<RedeemCodeWhereInput>>;
  NOT?: InputMaybe<Array<RedeemCodeWhereInput>>;
  OR?: InputMaybe<Array<RedeemCodeWhereInput>>;
  code?: InputMaybe<StringFilter>;
  gitPOAP?: InputMaybe<GitPoapRelationFilter>;
  gitPOAPId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type RedeemCodeWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Repo = {
  __typename?: 'Repo';
  _count?: Maybe<RepoCount>;
  createdAt: Scalars['DateTime'];
  gitPOAPs: Array<GitPoap>;
  githubRepoId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  organization: Organization;
  organizationId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type RepoGitPoaPsArgs = {
  cursor?: InputMaybe<GitPoapWhereUniqueInput>;
  distinct?: InputMaybe<Array<GitPoapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GitPoapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GitPoapWhereInput>;
};

export type RepoCount = {
  __typename?: 'RepoCount';
  gitPOAPs: Scalars['Int'];
};

export type RepoGitPoapData = {
  __typename?: 'RepoGitPOAPData';
  event: PoapEvent;
  gitPOAP: GitPoap;
};

export type RepoGitPoaPs = {
  __typename?: 'RepoGitPOAPs';
  gitPOAPs: Array<RepoGitPoapData>;
  totalGitPOAPs: Scalars['Float'];
};

export type RepoListRelationFilter = {
  every?: InputMaybe<RepoWhereInput>;
  none?: InputMaybe<RepoWhereInput>;
  some?: InputMaybe<RepoWhereInput>;
};

export type RepoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RepoOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  gitPOAPs?: InputMaybe<GitPoapOrderByRelationAggregateInput>;
  githubRepoId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organization?: InputMaybe<OrganizationOrderByWithRelationInput>;
  organizationId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RepoRelationFilter = {
  is?: InputMaybe<RepoWhereInput>;
  isNot?: InputMaybe<RepoWhereInput>;
};

export enum RepoScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubRepoId = 'githubRepoId',
  Id = 'id',
  Name = 'name',
  OrganizationId = 'organizationId',
  UpdatedAt = 'updatedAt',
}

export type RepoWhereInput = {
  AND?: InputMaybe<Array<RepoWhereInput>>;
  NOT?: InputMaybe<Array<RepoWhereInput>>;
  OR?: InputMaybe<Array<RepoWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gitPOAPs?: InputMaybe<GitPoapListRelationFilter>;
  githubRepoId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  organization?: InputMaybe<OrganizationRelationFilter>;
  organizationId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RepoWhereUniqueInput = {
  githubRepoId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  profileByENS?: Maybe<ProfileWithEns>;
  profilesByAddress: Array<Profile>;
  profilesByName: Array<Profile>;
  usersByGithubHandle: Array<User>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  claims: Array<Claim>;
  createdAt: Scalars['DateTime'];
  githubHandle: Scalars['String'];
  githubId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type UserClaimsArgs = {
  cursor?: InputMaybe<ClaimWhereUniqueInput>;
  distinct?: InputMaybe<Array<ClaimScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ClaimOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClaimWhereInput>;
};

export type UserCount = {
  __typename?: 'UserCount';
  authTokens: Scalars['Int'];
  claims: Scalars['Int'];
};

export type UserFeaturedGitPoapData = {
  __typename?: 'UserFeaturedGitPOAPData';
  claim: Claim;
  poap: PoapToken;
};

export type UserFeaturedPoaPs = {
  __typename?: 'UserFeaturedPOAPs';
  gitPOAPs: Array<UserFeaturedGitPoapData>;
  poaps: Array<PoapToken>;
};

export type UserGitPoapData = {
  __typename?: 'UserGitPOAPData';
  claim: Claim;
  event: PoapEvent;
};

export type UserOrderByWithRelationInput = {
  claims?: InputMaybe<ClaimOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  githubHandle?: InputMaybe<SortOrder>;
  githubId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserPoaPs = {
  __typename?: 'UserPOAPs';
  gitPOAPs: Array<UserGitPoapData>;
  poaps: Array<PoapToken>;
  totalGitPOAPs: Scalars['Float'];
  totalPOAPs: Scalars['Float'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  GithubHandle = 'githubHandle',
  GithubId = 'githubId',
  Id = 'id',
  UpdatedAt = 'updatedAt',
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  claims?: InputMaybe<ClaimListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  githubHandle?: InputMaybe<StringFilter>;
  githubId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  githubId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type GetAllStatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllStatsQuery = {
  __typename?: 'Query';
  totalContributors: number;
  lastMonthContributors: number;
  totalClaims: number;
  lastMonthClaims: number;
  totalRepos: number;
  lastMonthRepos: number;
};

export type LeadersQueryVariables = Exact<{
  count: Scalars['Float'];
}>;

export type LeadersQuery = {
  __typename?: 'Query';
  mostHonoredContributors: Array<{
    __typename?: 'ProfileWithClaimsCount';
    claimsCount: number;
    profile: { __typename?: 'Profile'; address: string; id: number };
  }>;
};

export type GitpoapByPoapEventIdQueryVariables = Exact<{
  poapEventId: Scalars['Int'];
}>;

export type GitpoapByPoapEventIdQuery = {
  __typename?: 'Query';
  gitPOAP?: {
    __typename?: 'GitPOAP';
    id: number;
    poapEventId: number;
    status: GitPoapStatus;
    repo: { __typename?: 'Repo'; name: string };
  } | null;
};

export type GitPoapHoldersQueryVariables = Exact<{
  gitPOAPId: Scalars['Float'];
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
}>;

export type GitPoapHoldersQuery = {
  __typename?: 'Query';
  gitPOAPHolders?: {
    __typename?: 'Holders';
    totalHolders: number;
    holders: Array<{
      __typename?: 'Holder';
      address: string;
      githubHandle: string;
      gitPOAPCount: number;
      profileId: number;
      bio?: string | null;
      personalSiteUrl?: string | null;
      twitterHandle?: string | null;
    }>;
  } | null;
};

export type MostClaimedGitPoapsQueryVariables = Exact<{
  count: Scalars['Float'];
}>;

export type MostClaimedGitPoapsQuery = {
  __typename?: 'Query';
  mostClaimedGitPOAPs?: Array<{
    __typename?: 'GitPOAPWithClaimsCount';
    claimsCount: number;
    gitPOAP: { __typename?: 'GitPOAP'; id: number; repo: { __typename?: 'Repo'; name: string } };
    event: { __typename?: 'POAPEvent'; name: string; image_url: string };
  }> | null;
};

export type ProfileQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type ProfileQuery = {
  __typename?: 'Query';
  profileData?: {
    __typename?: 'NullableProfile';
    id?: number | null;
    bio?: string | null;
    name?: string | null;
    twitterHandle?: string | null;
    personalSiteUrl?: string | null;
    address: string;
  } | null;
};

export type SearchForStringQueryVariables = Exact<{
  text: Scalars['String'];
}>;

export type SearchForStringQuery = {
  __typename?: 'Query';
  search: {
    __typename?: 'SearchResults';
    profilesByAddress: Array<{ __typename?: 'Profile'; id: number; address: string }>;
    profileByENS?: {
      __typename?: 'ProfileWithENS';
      ens: string;
      profile: { __typename?: 'Profile'; id: number; address: string };
    } | null;
  };
};

export type GitPoapsQueryVariables = Exact<{
  address: Scalars['String'];
  sort?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  perPage?: InputMaybe<Scalars['Float']>;
}>;

export type GitPoapsQuery = {
  __typename?: 'Query';
  userPOAPs?: {
    __typename?: 'UserPOAPs';
    totalGitPOAPs: number;
    gitPOAPs: Array<{
      __typename?: 'UserGitPOAPData';
      claim: {
        __typename?: 'Claim';
        status: ClaimStatus;
        poapTokenId?: string | null;
        gitPOAP: {
          __typename?: 'GitPOAP';
          id: number;
          repo: { __typename?: 'Repo'; name: string };
        };
      };
      event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
    }>;
  } | null;
};

export type OpenClaimsQueryVariables = Exact<{
  githubId: Scalars['Float'];
}>;

export type OpenClaimsQuery = {
  __typename?: 'Query';
  userClaims?: Array<{
    __typename?: 'FullClaimData';
    claim: {
      __typename?: 'Claim';
      id: number;
      gitPOAP: {
        __typename?: 'GitPOAP';
        id: number;
        repo: { __typename?: 'Repo'; organization: { __typename?: 'Organization'; name: string } };
      };
    };
    event: { __typename?: 'POAPEvent'; name: string; image_url: string; description: string };
  }> | null;
};

export type RecentProjectsQueryVariables = Exact<{
  count: Scalars['Float'];
}>;

export type RecentProjectsQuery = {
  __typename?: 'Query';
  recentlyAddedProjects: Array<{
    __typename?: 'Repo';
    id: number;
    name: string;
    createdAt: any;
    organization: { __typename?: 'Organization'; name: string };
  }>;
};

export const GetAllStatsDocument = gql`
  query getAllStats {
    totalContributors
    lastMonthContributors
    totalClaims
    lastMonthClaims
    totalRepos
    lastMonthRepos
  }
`;

export function useGetAllStatsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllStatsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllStatsQuery>({ query: GetAllStatsDocument, ...options });
}
export const LeadersDocument = gql`
  query leaders($count: Float!) {
    mostHonoredContributors(count: $count) {
      profile {
        address
        id
      }
      claimsCount
    }
  }
`;

export function useLeadersQuery(options: Omit<Urql.UseQueryArgs<LeadersQueryVariables>, 'query'>) {
  return Urql.useQuery<LeadersQuery>({ query: LeadersDocument, ...options });
}
export const GitpoapByPoapEventIdDocument = gql`
  query gitpoapByPoapEventId($poapEventId: Int!) {
    gitPOAP(where: { poapEventId: $poapEventId }) {
      id
      poapEventId
      status
      repo {
        name
      }
    }
  }
`;

export function useGitpoapByPoapEventIdQuery(
  options: Omit<Urql.UseQueryArgs<GitpoapByPoapEventIdQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitpoapByPoapEventIdQuery>({
    query: GitpoapByPoapEventIdDocument,
    ...options,
  });
}
export const GitPoapHoldersDocument = gql`
  query gitPOAPHolders($gitPOAPId: Float!, $page: Float, $perPage: Float, $sort: String) {
    gitPOAPHolders(gitPOAPId: $gitPOAPId, page: $page, perPage: $perPage, sort: $sort) {
      totalHolders
      holders {
        address
        githubHandle
        gitPOAPCount
        profileId
        bio
        personalSiteUrl
        twitterHandle
      }
    }
  }
`;

export function useGitPoapHoldersQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapHoldersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapHoldersQuery>({ query: GitPoapHoldersDocument, ...options });
}
export const MostClaimedGitPoapsDocument = gql`
  query mostClaimedGitPoaps($count: Float!) {
    mostClaimedGitPOAPs(count: $count) {
      claimsCount
      gitPOAP {
        id
        repo {
          name
        }
      }
      event {
        name
        image_url
      }
    }
  }
`;

export function useMostClaimedGitPoapsQuery(
  options: Omit<Urql.UseQueryArgs<MostClaimedGitPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MostClaimedGitPoapsQuery>({
    query: MostClaimedGitPoapsDocument,
    ...options,
  });
}
export const ProfileDocument = gql`
  query profile($address: String!) {
    profileData(address: $address) {
      id
      bio
      name
      twitterHandle
      personalSiteUrl
      address
    }
  }
`;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options });
}
export const SearchForStringDocument = gql`
  query searchForString($text: String!) {
    search(text: $text) {
      profilesByAddress {
        id
        address
      }
      profileByENS {
        profile {
          id
          address
        }
        ens
      }
    }
  }
`;

export function useSearchForStringQuery(
  options: Omit<Urql.UseQueryArgs<SearchForStringQueryVariables>, 'query'>,
) {
  return Urql.useQuery<SearchForStringQuery>({ query: SearchForStringDocument, ...options });
}
export const GitPoapsDocument = gql`
  query gitPoaps($address: String!, $sort: String, $page: Float, $perPage: Float) {
    userPOAPs(address: $address, sort: $sort, page: $page, perPage: $perPage) {
      totalGitPOAPs
      gitPOAPs {
        claim {
          gitPOAP {
            id
            repo {
              name
            }
          }
          status
          poapTokenId
        }
        event {
          name
          image_url
          description
        }
      }
    }
  }
`;

export function useGitPoapsQuery(
  options: Omit<Urql.UseQueryArgs<GitPoapsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GitPoapsQuery>({ query: GitPoapsDocument, ...options });
}
export const OpenClaimsDocument = gql`
  query openClaims($githubId: Float!) {
    userClaims(githubId: $githubId) {
      claim {
        id
        gitPOAP {
          id
          repo {
            organization {
              name
            }
          }
        }
      }
      event {
        name
        image_url
        description
      }
    }
  }
`;

export function useOpenClaimsQuery(
  options: Omit<Urql.UseQueryArgs<OpenClaimsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<OpenClaimsQuery>({ query: OpenClaimsDocument, ...options });
}
export const RecentProjectsDocument = gql`
  query recentProjects($count: Float!) {
    recentlyAddedProjects(count: $count) {
      id
      name
      createdAt
      organization {
        name
      }
    }
  }
`;

export function useRecentProjectsQuery(
  options: Omit<Urql.UseQueryArgs<RecentProjectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<RecentProjectsQuery>({ query: RecentProjectsDocument, ...options });
}