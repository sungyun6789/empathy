import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getItems } from '~/lib/api/items';

import Card from './Card';

const CardList = () => {
  const [sortType, setSortType] = useState<'like' | 'update'>('update');

  const { data, refetch } = useQuery(['/items'], getItems);

  useEffect(() => {
    refetch();
  }, [sortType]);

  const items = useMemo(
    () => (sortType === 'like' ? data?.sort((lhs, rhs) => rhs.itemLikes - lhs.itemLikes) : data),
    [data, sortType],
  );

  return (
    <>
      <SelectWrapper>
        <Select select={sortType === 'update'} onClick={() => setSortType('update')}>
          최신
        </Select>
        <Select select={sortType === 'like'} onClick={() => setSortType('like')}>
          좋아요
        </Select>
      </SelectWrapper>
      <List>
        {items?.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </List>
    </>
  );
};

export default CardList;

const SelectWrapper = styled.section`
  display: flex;
  margin-bottom: 30px;
  padding-left: 20px;

  p ~ p {
    margin-left: 10px;
  }
`;

const Select = styled.p<{ select: boolean }>`
  margin: 0;
  padding: 0 10px 5px 10px;
  cursor: pointer;

  ${(props) =>
    props.select && {
      fontWeight: 'bold',
      borderBottom: '2px solid black',
    }}
`;

const List = styled.section`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 5px;
  place-items: center;
`;
