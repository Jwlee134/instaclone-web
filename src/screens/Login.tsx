import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { isDarkModeVar, isLoggedInVar } from "../apollo";

const Container = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.fontColor};
`;

function Login() {
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <Container>
      <Title onClick={() => isLoggedInVar(true)}>Login</Title>
      <button onClick={() => isDarkModeVar(!isDarkMode)}>toggle dark</button>
    </Container>
  );
}

export default Login;
