import styled from 'styled-components';

import { COLORS } from '~/lib/colors';

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  width?: number | string;
  height?: number | string;
  isFill?: boolean;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

const Button = ({ ...rest }: Props) => {
  return <StyledButton {...rest} />;
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => props.width ?? '80px'};
  height: ${(props) => props.height ?? '35px'};
  font-size: 14px;
  color: ${(props) => (props.isFill ? '#ffffff' : COLORS.primary)};
  background-color: ${(props) => (props.isFill ? COLORS.primary : '#ffffff')};
  border: 1px solid ${COLORS.primary};
  border-radius: 4px;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    color: ${(props) => (props.isFill ? COLORS.primary : '#ffffff')};
    background-color: ${(props) => (props.isFill ? '#ffffff' : COLORS.primary)};
  }
`;
