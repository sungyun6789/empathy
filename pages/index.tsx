import { useContext } from 'react';
import { useQuery } from 'react-query';

import CardList from '~/components/home/CardList';
import { UserContext } from '~/contexts/UserContext';
import { getMyAccount } from '~/lib/auth';

import type { NextPageContext } from 'next';

interface Props {
  accessToken: string | null;
  refreshToken: string | null;
}

const Home = ({ accessToken, refreshToken }: Props) => {
  const { setState } = useContext(UserContext);

  useQuery(['/auth/me'], getMyAccount, {
    onSuccess: (data) => setState(data),
    enabled: !!(accessToken || refreshToken),
  });

  return <CardList />;
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const cookies = context.req?.headers.cookie?.split('; ');

  const accessToken = cookies?.[0].split('access_token=')[1] ?? null;
  const refreshToken = cookies?.[1].split('refresh_token=')[1] ?? null;

  return {
    props: {
      accessToken,
      refreshToken,
    },
  };
}
