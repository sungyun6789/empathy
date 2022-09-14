import CardDetail from '~/components/home/CardDetail';
import useUser from '~/hooks/useUser';
import { cookieParser } from '~/lib/cookies';

import type { NextPageContext } from 'next';
import type { CookieParserToken } from '~/lib/cookies';

interface Props {
  access_token: CookieParserToken['access_token'];
  refresh_token: CookieParserToken['refresh_token'];
}

const items = ({ access_token, refresh_token }: Props) => {
  useUser({ access_token, refresh_token });

  return <CardDetail />;
};

export default items;

export async function getServerSideProps(context: NextPageContext) {
  const { access_token, refresh_token } = cookieParser(context.req?.headers.cookie);

  return {
    props: {
      access_token,
      refresh_token,
    },
  };
}
