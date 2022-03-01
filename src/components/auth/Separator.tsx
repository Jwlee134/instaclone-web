import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0 30px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.borderColor};
  }
  span {
    margin: 0 10px;
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 600;
  }
`;

function Separator() {
  return (
    <Container>
      <div />
      <span>Or</span>
      <div />
    </Container>
  );
}

export default Separator;
