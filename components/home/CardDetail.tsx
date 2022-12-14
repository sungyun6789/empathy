import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

import { UserContext } from '~/contexts/UserContext';
import { getItemDetails, likeItem } from '~/lib/api/items';
import { errorMessage } from '~/lib/error';

import LikeIcon from '../system/LikeIcon';

import type { ErrorResponse } from '~/lib/error';

const CardDetail = () => {
  const { state } = useContext(UserContext);
  const { query } = useRouter();

  const id = query.id as string;

  const { data, refetch } = useQuery([`/items/${id}`], () => getItemDetails(id), {
    enabled: !!id,
  });

  const { mutate } = useMutation(likeItem, {
    onSuccess: () => refetch(),
    onError: (error: ErrorResponse) => errorMessage(error),
  });

  useEffect(() => {
    refetch();
  }, [state]);

  return (
    <>
      <Head>
        <title>공감 - {data?.description}</title>
      </Head>
      <Block>
        <div>
          <Video
            src={`https://www.youtube.com/embed/${data?.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Description>
            <p>{data?.description}</p>
          </Description>
        </div>
      </Block>
      <LikeButton>
        <div>
          <LikeIconWrapper onClick={() => mutate(id)}>
            <LikeIcon width="17" height="17" alreadyLike={data?.alreadyLike} />
          </LikeIconWrapper>
          <LikeCount>좋아요 {data?.likes}개</LikeCount>
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

const Description = styled.section`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const Video = styled.iframe`
  width: 50vw;
  height: 50vh;
  margin-top: 60px;

  @media (max-width: 1440px) {
    width: 60vw;
    height: 40vh;
  }

  @media (max-width: 1024px) {
    width: 70vw;
    height: 30vh;
  }
`;

const LikeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const LikeIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const LikeCount = styled.div`
  margin-top: 10px;
`;
