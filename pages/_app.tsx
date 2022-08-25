import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { UserProvider } from 'contexts/UserContext';
import queryClient from 'react-query.setting';
import BasicLayout from '~/components/layout/BasicLayout';
import GlobalStyle from '~/styles/GlobalStyle';

import type { AppProps } from 'next/app';

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BasicLayout>
          <GlobalStyle />
          <Component {...pageProps} />
        </BasicLayout>
        <ReactQueryDevtools />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default _app;
