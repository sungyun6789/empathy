import { useContext } from 'react';
import { useQuery } from 'react-query';

import CardList from '~/components/home/CardList';
import { UserContext } from '~/contexts/UserContext';
import { getMyAccount } from '~/lib/auth';

const Home = () => {
  const { setState } = useContext(UserContext);

  useQuery(['/auth/me'], getMyAccount, {
    onSuccess: (data) => setState(data),
  });

  return <CardList />;
};

export default Home;
