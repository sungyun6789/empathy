import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ ...rest }: Props) => {
  return <StyledTextArea {...rest} />;
};

export default TextArea;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 60px;
  border: 1px solid ${COLORS.gray1};
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 14px;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid ${COLORS.primary};
  }
`;
