import styled from 'styled-components';

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
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  margin: 0;
`;
