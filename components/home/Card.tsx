import Image from 'next/image';
import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import type { Item } from '@prisma/client';

interface Props {
  item: Item;
}

const Card = ({ item }: Props) => {
  return (
    <Block>
      {/** 썸네일 해상도: https://stackoverflow.com/questions/18681788/how-to-get-a-youtube-thumbnail-from-a-youtube-iframe */}
      <Thumbnail src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} />

      <Description>{item.description}</Description>
      <Footer>
        <div>
          <Image src="/like.svg" alt="like" width="12" height="11" />
        </div>
        <CountBlock>0</CountBlock>
      </Footer>
    </Block>
  );
};

export default Card;

const Block = styled.article`
  width: 320px;
  height: 260px;
  border-radius: 7px;
  box-sizing: border-box;
  border: 1px solid ${COLORS.gray0};
  margin: 10px;
`;

const Thumbnail = styled.iframe`
  width: 100%;
  height: 152px;
  object-fit: contain;
  border: none;
`;

const Description = styled.div`
  height: 60px;
  padding: 10px;
  font-size: 12px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
`;

const CountBlock = styled.div`
  margin-left: 5px;
  font-size: 14px;
`;
