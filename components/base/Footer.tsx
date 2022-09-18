import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

const Footer = () => {
  return (
    <Block>
      <div>
        <P>github @sungyun6789</P>
        <P>email @sungyun5423@gmail.com</P>
      </div>
    </Block>
  );
};

export default Footer;

const Block = styled.footer`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: white;
  border-top: 1px solid ${COLORS.primary};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  margin: 0;
`;
