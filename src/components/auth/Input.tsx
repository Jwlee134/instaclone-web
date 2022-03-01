import styled from "styled-components";

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${({ theme }) => theme.borderColor};
  border-radius: 3px;
  margin-top: 5px;
  &::placeholder {
    font-size: 12px;
  }
`;

/* interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...props }: Props) {
  return <SInput {...props} />;
} */

export default Input;
