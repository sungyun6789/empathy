import Link from 'next/link';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { UserContext } from '~/contexts/UserContext';
import { logout } from '~/lib/auth';

import Button from '../system/Button';
import WriteButton from '../write/WriteButton';

const AuthButton = () => {
  const { state, setState } = useContext(UserContext);

  const { mutate } = useMutation(logout, {
    onSuccess: () => setState(undefined),
  });

  return state ? (
    <Block>
      <WriteButton />
      <Button onClick={() => mutate(state)}>로그아웃</Button>
    </Block>
  ) : (
    <Link href="/auth/login">
      <a>
        <Button>로그인</Button>
      </a>
    </Link>
  );
};

export default AuthButton;

const Block = styled.div`
  button:first-child {
    margin-right: 5px;
  }
`;
