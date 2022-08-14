import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: Props) => {
  return <StyledInput {...rest} />;
};

export default Input;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${COLORS.gray1};
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border: 1px solid ${COLORS.primary};
  }
`;
