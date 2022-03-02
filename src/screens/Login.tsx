import { gql } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import AuthLayout from "../components/auth/Container";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { useLoginMutation } from "../graphql/generated";
import routes from "../routes";

const FacebookLogin = styled.button`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

interface Form {
  username: string;
  password: string;
  resultError?: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      isSuccess
      token
      error
    }
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<Form>({ mode: "onChange" });
  const [login, { loading }] = useLoginMutation({
    onCompleted: ({ login }) => {
      if (!login) return;
      const { error, token } = login;
      if (error) {
        setError("resultError", { message: error });
        return;
      }
      if (token) logUserIn(token);
    },
  });

  const onValid: SubmitHandler<Form> = (data) => {
    login({ variables: data });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login • Instagram" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters.",
              },
            })}
            type="text"
            placeholder="Username"
            error={errors?.username?.message}
            onFocus={() => clearErrors("resultError")}
          />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            type="password"
            placeholder="Password"
            error={errors?.password?.message}
            onFocus={() => clearErrors("resultError")}
          />
          <Button type="submit" disabled={loading || !isValid}>
            {loading ? "Loading" : "Log In"}
          </Button>
          <FormError error={errors?.resultError?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        spanText="Don't have an account? "
        linkText="Sign Up"
        href={routes.signUp}
      />
    </AuthLayout>
  );
}

export default Login;
