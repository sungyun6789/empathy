import Link from 'next/link';
import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import AuthButton from '../auth/AuthButton';

const Header = () => {
  return (
    <Block>
      <Link href="/">
        <Title>공감</Title>
      </Link>
      <AuthButton />
    </Block>
  );
};

export default Header;

const Block = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  margin-bottom: 50px;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: ${COLORS.primary};
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
`;
