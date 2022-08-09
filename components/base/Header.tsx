import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

const Header = () => {
  return (
    <Block>
      <Title>공감</Title>
    </Block>
  );
};

export default Header;

const Block = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid ${COLORS.gray0};
`;

const Title = styled.div`
  color: ${COLORS.primary};
  font-size: 20px;
  font-weight: 700;
`;
