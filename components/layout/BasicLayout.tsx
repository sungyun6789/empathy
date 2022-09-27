import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header from '../base/Header';

import type { ReactNode } from 'react';

const Footer = dynamic(() => import('../base/Footer'));

interface Props {
  children: ReactNode;
}

const BasicLayout = ({ children }: Props) => {
  const { pathname } = useRouter();

  return (
    <Block>
      <Header />
      {children}
      {pathname !== '/' && <Footer />}
    </Block>
  );
};

export default BasicLayout;

const Block = styled.main`
  max-width: 1400px;
  margin: auto;
`;
