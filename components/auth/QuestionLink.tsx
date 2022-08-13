import Link from 'next/link';
import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

interface Props {
  actionLink: string;
  question: string;
}

const QuestionLink = ({ actionLink, question }: Props) => {
  return (
    <Block>
      <Link href={actionLink}>
        <Question>{question}</Question>
      </Link>
    </Block>
  );
};

export default QuestionLink;

const Block = styled.div`
  margin-top: 30px;
`;

const Question = styled.a`
  text-decoration: none;
  color: ${COLORS.primary};
  cursor: pointer;
`;
