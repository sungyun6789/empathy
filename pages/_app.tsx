import GlobalStyle from '~/styles/GlobalStyle';

import type { AppProps } from 'next/app';

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default _app;
