import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: Props) => {
  return <StyledInput {...rest} />;
};

export default Input;

const StyledInput = styled.input`
  width: 220px;
  height: 24px;
  border: 1px solid ${COLORS.gray1};

  &:focus {
    outline: none;
    border: 2px solid ${COLORS.primary};
  }
`;
