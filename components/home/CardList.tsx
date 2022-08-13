import styled from 'styled-components';

import Card from './Card';

const CardList = () => {
  const mock = new Array(13).fill(undefined);

  return (
    <List>
      {mock.map((_, i) => (
        <Card key={i} item={undefined} />
      ))}
    </List>
  );
};

export default CardList;

const List = styled.div`
  max-width: 1700px;
  margin: 50px auto auto;
  display: flex;
  flex-wrap: wrap;
`;
