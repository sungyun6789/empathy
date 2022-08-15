import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import BasicLayout from '~/components/layout/BasicLayout';
import GlobalStyle from '~/styles/GlobalStyle';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BasicLayout>
        <GlobalStyle />
        <Component {...pageProps} />
      </BasicLayout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default _app;
