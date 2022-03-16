export type Claim = {
  id: string;
  status: ClaimStatus;
  poapTokenId: string;
  gitPoapId: string;
  address: string;
  userId: string;
  gitPoap?: GitPOAP;
};

export type UserClaim = {
  claim: {
    id: number;
    gitPOAP: {
      repo: {
        organization: {
          name: string;
        };
      };
    };
  };
  event: {
    id: number;
    name: string;
    image_url: string;
    description: string;
  };
};

export type GitPOAP = {
  id: string;
  name: string;
  description: string;
  orgName: string;
  imgSrc: string;
};

export type GitPOAPGql = {
  claim: {
    gitPOAP: {
      repo: {
        name: string;
      };
    };
  };
  poap: POAP;
};

export enum ClaimStatus {
  UNCLAIMED = 'UNCLAIMED',
  PENDING = 'PENDING',
  CLAIMED = 'CLAIMED',
}

export type Project = {
  id: number;
  name: string;
  createdAt: string;
  organization: {
    name: string;
  };
};

export type POAP = {
  event: {
    name: string;
    image_url: string;
  };
  tokenId: string;
};
