import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import type { ItemModel } from '~/lib/api/items';

interface Props {
  item: ItemModel;
}

const Card = ({ item }: Props) => {
  return (
    <Block>
      <Link href={`/items/?id=${item.id}`}>
        <Anchor>
          {/** 썸네일 해상도: https://stackoverflow.com/questions/18681788/how-to-get-a-youtube-thumbnail-from-a-youtube-iframe */}
          <Thumbnail src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} />
          <Description>{item.description}</Description>
          <Footer>
            <div>
              <Image src="/like.svg" alt="like" width="12" height="11" />
            </div>
            <CountBlock>{item.itemLikes}</CountBlock>
          </Footer>
        </Anchor>
      </Link>
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
  cursor: pointer;
`;

/** styled component를 사용하면 기본 a tag의 스타일이 들어가지 않음 */
const Anchor = styled.a``;

const Thumbnail = styled.img`
  width: 100%;
  height: 152px;
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
