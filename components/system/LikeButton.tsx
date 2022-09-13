import Image from 'next/image';
import styled from 'styled-components';

const LikeButton = () => {
  return (
    <Block>
      <div>
        <LikeIconWrapper>
          <Image src="/like.svg" alt="like" width="17" height="17" color="red" />
        </LikeIconWrapper>
        <LikeCount>좋아요 123개</LikeCount>
      </div>
    </Block>
  );
};

export default LikeButton;

const Block = styled.div`
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
