import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Header from '../base/Header';

import type { ReactNode } from 'react';

const Footer = dynamic(() => import('../base/Footer'));

interface Props {
  children: ReactNode;
}

const BasicLayout = ({ children }: Props) => {
  const { pathname } = useRouter();

  return (
    <>
      <Header />
      {children}
      {pathname !== '/' && <Footer />}
    </>
  );
};

export default BasicLayout;
