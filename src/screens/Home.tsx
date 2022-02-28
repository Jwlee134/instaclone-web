import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const Container = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.fontColor};
`;

function Home() {
  return (
    <Container>
      <Title onClick={() => isLoggedInVar(false)}>Home</Title>
    </Container>
  );
}

export default Home;
