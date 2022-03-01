import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0;
  text-align: center;
  a {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.blue};
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Separator = styled.div`
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

const FacebookLogin = styled.button`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

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

const Button = styled.button`
  width: 100%;
  margin-top: 12px;
  background-color: ${({ theme }) => theme.palette.blue};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  border-radius: 3px;
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form>
            <Input type="text" placeholder="Username" />
            <Input type="text" placeholder="Password" />
            <Button type="submit">Log in</Button>
          </form>
          <Separator>
            <div />
            <span>Or</span>
            <div />
          </Separator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>Don't have an account? </span>
          <Link to="sign-up">Sign up</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
}

export default Login;
