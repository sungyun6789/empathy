import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

interface Props {
  item: unknown;
}

const Card = ({ item }: Props) => {
  return (
    <Block>
      <Thumbnail>{/** youtube banner */}</Thumbnail>
      <Description>{/** description */}</Description>
      <Footer>
        <div>{/** like icon */}</div>
        <div>{/** like count */}</div>
      </Footer>
    </Block>
  );
};

export default Card;

const Block = styled.article`
  width: 320px;
  height: 250px;
  border: 1px solid ${COLORS.gray0};
  border-radius: 7px;
`;

const Thumbnail = styled.div`
  height: 152px;
  border-bottom: 1px solid ${COLORS.gray0};
`;

const Description = styled.div`
  height: 60px;
  padding: 10px;
`;

const Footer = styled.div``;
