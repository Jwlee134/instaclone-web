import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import FormError from "./FormError";

const SInput = styled.input<{ hasError: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${({ theme, hasError }) => (!hasError ? theme.borderColor : "tomato")};
  border-radius: 3px;
  margin-top: 5px;
  &::placeholder {
    font-size: 12px;
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef(
  ({ error, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <>
        <SInput ref={ref} hasError={Boolean(error)} {...props} />
        <FormError error={error} />
      </>
    );
  }
);

export default Input;
