import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getItems } from '~/lib/api/items';

import Card from './Card';

const CardList = () => {
  const { data, refetch } = useQuery(['/items'], getItems);

  useEffect(() => {
    refetch();
  }, []);

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
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 5px;
  place-items: center;
`;
