import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getItems } from '~/lib/items';

import Card from './Card';

const CardList = () => {
  const { data } = useQuery(['/items'], getItems, {
    staleTime: Infinity,
  });

  return (
    <List>
      {data?.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </List>
  );
};

export default CardList;

const List = styled.div`
  max-width: 1700px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;
