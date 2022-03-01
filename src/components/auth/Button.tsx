import { ReactNode } from "react";
import styled from "styled-components";

const SBtn = styled.button`
  width: 100%;
  margin-top: 12px;
  background-color: ${({ theme }) => theme.palette.blue};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  border-radius: 3px;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...props }: Props) {
  return <SBtn {...props}>{children}</SBtn>;
}

export default Button;
