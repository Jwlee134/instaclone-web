import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";

const Container = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.fontColor};
`;

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title onClick={() => logUserOut(navigate)}>Home</Title>
    </Container>
  );
}

export default Home;
