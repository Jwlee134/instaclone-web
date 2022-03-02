import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import styled from "styled-components";
import { disableDarkMode, enableDarkMode, isDarkModeVar } from "../../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.div``;

const DarkModeBtn = styled.button`
  margin-top: 20px;
`;

function AuthLayout({ children }: { children: ReactNode }) {
  const isDarkMode = useReactiveVar(isDarkModeVar);

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={isDarkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={!isDarkMode ? faMoon : faSun} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

export default AuthLayout;
