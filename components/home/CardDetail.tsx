import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { getItemDetails } from '~/lib/api/items';

const CardDetail = () => {
  const { query } = useRouter();
  const id = query.id as string;

  const { data } = useQuery(['/items', id], () => getItemDetails(id), {
    enabled: !!id,
  });

  return <div>{query.id}</div>;
};

export default CardDetail;
