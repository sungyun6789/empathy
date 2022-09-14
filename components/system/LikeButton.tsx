import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { likeItem } from '~/lib/api/items';

interface Props {
  like: number;
}

const LikeButton = ({ like }: Props) => {
  const { query } = useRouter();
  const id = query.id;

  if (!id || typeof id !== 'string') return null;

  const { mutate } = useMutation(likeItem);

  return (
    <Block>
      <div>
        <LikeIconWrapper onClick={() => mutate(id)}>
          <Image src="/like.svg" alt="like" width="17" height="17" />
        </LikeIconWrapper>
        <LikeCount>좋아요 {like}개</LikeCount>
      </div>
    </Block>
  );
};

export default LikeButton;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const LikeIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const LikeCount = styled.div`
  margin-top: 10px;
`;
