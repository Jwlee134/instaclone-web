import { gql } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import AuthLayout from "../components/auth/Container";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import { useCreateAccountMutation } from "../graphql/generated";
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      isSuccess
      error
    }
  }
`;

interface Form {
  email: string;
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  resultError?: string;
}

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    getValues,
  } = useForm<Form>({ mode: "onChange" });
  const [createAccount, { loading }] = useCreateAccountMutation({
    onCompleted: ({ createAccount }) => {
      if (!createAccount) return;
      if (createAccount.error) {
        setError("resultError", { message: createAccount.error });
        return;
      }
      const { username, password } = getValues();
      navigate(routes.home, {
        replace: true,
        state: {
          message: "Account has created. Please log in.",
          username,
          password,
        },
      });
    },
  });

  const onValid: SubmitHandler<Form> = (data) => {
    createAccount({ variables: data });
  };

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
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("email", { required: "Email is required." })}
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            onFocus={() => clearErrors("resultError")}
          />
          <Input
            {...register("firstName", { required: "First Name is required." })}
            type="text"
            placeholder="First Name"
            error={errors.firstName?.message}
            onFocus={() => clearErrors("resultError")}
          />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
            onFocus={() => clearErrors("resultError")}
          />
          <Input
            {...register("username", { required: "Username is required." })}
            type="text"
            placeholder="Username"
            error={errors.username?.message}
            onFocus={() => clearErrors("resultError")}
          />
          <Input
            {...register("password", { required: "Password is required." })}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            onFocus={() => clearErrors("resultError")}
          />
          <Button type="submit" disabled={loading || !isValid}>
            {loading ? "Loading" : "Sign Up"}
          </Button>
          <FormError error={errors.resultError?.message} />
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
