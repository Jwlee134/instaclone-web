import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import AuthLayout from "../components/auth/Container";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
`;

function SignUp() {
  return (
    <AuthLayout>
      <PageTitle title="SignUp • Instagram" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form>
          <Input placeholder="Email" />
          <Input placeholder="Full Name" />
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Button type="submit">Sign Up</Button>
        </form>
      </FormBox>
      <BottomBox
        spanText="Have an account? "
        linkText="Log In"
        href={routes.home}
      />
    </AuthLayout>
  );
}

export default SignUp;
