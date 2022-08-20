import axios from 'axios';
import Link from 'next/link';
import { useContext } from 'react';
import { useMutation } from 'react-query';

import { UserContext } from 'contexts/UserContext';

import Button from '../system/Button';

const AuthButton = () => {
  const user = useContext(UserContext);

  const { mutate } = useMutation(() => axios.post('api/auth/logout'));

  return user ? (
    <Button onClick={() => mutate()}>로그아웃</Button>
  ) : (
    <Link href="/login">
      <a>
        <Button>로그인</Button>
      </a>
    </Link>
  );
};

export default AuthButton;
