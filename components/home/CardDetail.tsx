import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getItemDetails } from '~/lib/api/items';

const CardDetail = () => {
  const { query } = useRouter();
  const id = query.id as string;

  const { data } = useQuery(['/items', id], () => getItemDetails(id), {
    enabled: !!id,
  });

  return (
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
