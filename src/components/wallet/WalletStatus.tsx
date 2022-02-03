import styled from 'styled-components';
import { rem } from 'polished';
import { shortenAddress } from '../../helpers';
import { Gray3, DarkBlue2, White } from '../../colors';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';

type Props = {
  account: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const JazzIconOuter = styled.div`
  border-radius: 50%;
  padding: ${rem(2)};
  border: 1px solid ${Gray3};
  transition: 200ms border ease;
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${Gray3};
  border-radius: ${rem(40)};
  padding: ${rem(5)} ${rem(5)} ${rem(5)} ${rem(15)};
  cursor: pointer;
  color: ${White};
  transition: 200ms color ease, 200ms border ease;

  &:hover {
    color: ${DarkBlue2};
    border: 1px solid ${Gray3};

    ${JazzIconOuter} {
      border: 1px solid ${Gray3};
    }
  }
`;

const Account = styled.div`
  font-weight: 500;
  font-size: ${rem(16)};
  line-height: ${rem(24)};
  margin-right: ${rem(5)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(30)};
  width: ${rem(30)};
`;

export const WalletStatus = (props: Props) => {
  const { account, onClick } = props;
  return (
    <Container onClick={onClick}>
      <Account>{shortenAddress(account)}</Account>
      <JazzIconOuter>
        <JazzIcon address={account} />
      </JazzIconOuter>
    </Container>
  );
};
