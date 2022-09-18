import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

const _error = () => {
  const { back } = useRouter();

  return (
    <Block>
      <div>
        <h1>404 Not Found</h1>
        <Text onClick={back}>이전 페이지로 돌아가기</Text>
      </div>
    </Block>
  );
};

export default _error;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Text = styled.p`
  cursor: pointer;
  color: ${COLORS.primary};
`;
