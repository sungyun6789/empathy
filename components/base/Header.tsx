import Link from 'next/link';
import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import Button from '../system/Button';

const Header = () => {
  return (
    <Block>
      <Link href="/">
        <Title>공감</Title>
      </Link>
      <Link href="/login">
        <a>
          <Button>로그인</Button>
        </a>
      </Link>
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
  border-bottom: 1px solid ${COLORS.gray0};
  box-sizing: border-box;
`;

const Title = styled.div`
  color: ${COLORS.primary};
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
