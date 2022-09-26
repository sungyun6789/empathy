import 'axios.setting';

import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import queryClient from 'react-query.setting';
import BasicLayout from '~/components/layout/BasicLayout';
import { UserProvider } from '~/contexts/UserContext';
import GlobalStyle from '~/styles/GlobalStyle';

import type { AppProps } from 'next/app';

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BasicLayout>
          <GlobalStyle />
          <Head>
            <title>공감</title>
          </Head>
          <Component {...pageProps} />
          <Toaster />
        </BasicLayout>
        <ReactQueryDevtools />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default _app;
