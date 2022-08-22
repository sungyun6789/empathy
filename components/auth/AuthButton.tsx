import axios from 'axios';
import Link from 'next/link';
import { useContext } from 'react';
import { useMutation } from 'react-query';

import { UserContext } from 'contexts/UserContext';

import Button from '../system/Button';

import type { User } from '@prisma/client';

const AuthButton = () => {
  const { state, setState } = useContext(UserContext);

  const { mutate } = useMutation((user: User) => axios.post('api/auth/logout', user), {
    onSuccess: () => setState(undefined),
  });

  return state ? (
    <Button onClick={() => mutate(state)}>로그아웃</Button>
  ) : (
    <Link href="/login">
      <a>
        <Button>로그인</Button>
      </a>
    </Link>
  );
};

export default AuthButton;
