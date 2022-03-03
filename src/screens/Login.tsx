import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import AuthLayout from "../components/auth/AuthLayout";
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

const Notification = styled.span`
  color: #2ecc71;
  margin-top: 15px;
`;

interface Form {
  username: string;
  password: string;
  resultError?: string;
}

interface State {
  message: string;
  username?: string;
  password?: string;
}

function Login() {
  const location = useLocation();
  const state = location.state as State;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<Form>({
    mode: "onChange",
    defaultValues: {
      username: state?.username || "",
      password: state?.password || "",
    },
  });
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
        {state?.message && <Notification>{state.message}</Notification>}
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
