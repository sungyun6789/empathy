import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ ...rest }: Props) => {
  return <StyledButton {...rest} />;
};

export default Button;

const StyledButton = styled.button`
  width: 80px;
  height: 33px;
  font-size: 14px;
  color: white;
  background-color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  border-radius: 4px;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    color: ${COLORS.primary};
    background-color: white;
  }
`;
