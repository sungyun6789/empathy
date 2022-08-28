import Link from 'next/link';
import { useContext } from 'react';
import { useMutation } from 'react-query';

import { UserContext } from '~/contexts/UserContext';
import { logout } from '~/lib/auth';

import Button from '../system/Button';

const AuthButton = () => {
  const { state, setState } = useContext(UserContext);

  const { mutate } = useMutation(logout, {
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
