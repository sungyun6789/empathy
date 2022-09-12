import { useContext } from 'react';
import { useQuery } from 'react-query';

import { UserContext } from '~/contexts/UserContext';
import { getMyAccount } from '~/lib/api/auth';

import type { CookieParserToken } from '~/lib/cookies';

interface Props {
  access_token: CookieParserToken['access_token'];
  refresh_token: CookieParserToken['refresh_token'];
}

const useUser = ({ access_token, refresh_token }: Props) => {
  const { setState } = useContext(UserContext);

  return useQuery(['/auth/me'], getMyAccount, {
    onSuccess: (data) => setState(data),
    enabled: !!(access_token || refresh_token),
  });
};

export default useUser;
