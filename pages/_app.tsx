import BasicLayout from '~/components/layout/BasicLayout';
import GlobalStyle from '~/styles/GlobalStyle';

import type { AppProps } from 'next/app';

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <BasicLayout>
      <GlobalStyle />
      <Component {...pageProps} />
    </BasicLayout>
  );
};

export default _app;
