import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

import { getItemDetails, likeItem } from '~/lib/api/items';

const CardDetail = () => {
  const { query } = useRouter();
  const id = query.id as string;

  const { data, refetch } = useQuery([`/items/${id}`], () => getItemDetails(id), {
    enabled: !!id,
  });

  const { mutate } = useMutation(likeItem, {
    onSuccess: () => refetch(),
  });

  return (
    <>
      <Block>
        <div>
          <Description>{data?.description}</Description>
          <Video
            src={`https://www.youtube.com/embed/${data?.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Block>
      <LikeButton>
        <div>
          <LikeIconWrapper onClick={() => mutate(id)}>
            <Image src="/like.svg" alt="like" width="17" height="17" />
          </LikeIconWrapper>
          {/* <LikeCount>좋아요 {data?.like}개</LikeCount> */}
        </div>
      </LikeButton>
    </>
  );
};

export default CardDetail;

const Block = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  padding: 10px;
`;

const Video = styled.iframe`
  width: 100vw;
  height: 50vh;
`;

const LikeButton = styled.div`
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
