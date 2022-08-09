import Header from '../base/Header';

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const BasicLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default BasicLayout;
