import { useContext } from 'react';
import { useQuery } from 'react-query';

import CardList from '~/components/home/CardList';
import { UserContext } from '~/contexts/UserContext';
import { getMyAccount } from '~/lib/auth';
import { cookieParser } from '~/lib/cookies';

import type { NextPageContext } from 'next';
import type { CookieParserToken } from '~/lib/cookies';

const Home = ({ access_token, refresh_token }: CookieParserToken) => {
  const { setState } = useContext(UserContext);

  useQuery(['/auth/me'], getMyAccount, {
    onSuccess: (data) => setState(data),
    enabled: !!(access_token || refresh_token),
  });

  return <CardList />;
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const { access_token, refresh_token } = cookieParser(context.req?.headers.cookie);

  return {
    props: {
      access_token,
      refresh_token,
    },
  };
}
