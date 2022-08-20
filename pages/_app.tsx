import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { UserContext } from 'contexts/UserContext';
import BasicLayout from '~/components/layout/BasicLayout';
import GlobalStyle from '~/styles/GlobalStyle';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

const _app = ({ Component, pageProps }: AppProps) => {
  const user = useContext(UserContext);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
        <BasicLayout>
          <GlobalStyle />
          <Component {...pageProps} />
        </BasicLayout>
        <ReactQueryDevtools />
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default _app;
