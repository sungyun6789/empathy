import { useRouter } from 'next/router';

const CardDetail = () => {
  const { query } = useRouter();

  return <div>{query.id}</div>;
};

export default CardDetail;
