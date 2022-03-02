import styled from "styled-components";

const Message = styled.span`
  font-size: 12px;
  color: red;
  font-weight: 500;
  margin: 5px 0 10px 0;
`;

interface Props {
  error?: string;
}

function FormError({ error }: Props) {
  return error ? <Message>{error}</Message> : null;
}

export default FormError;
