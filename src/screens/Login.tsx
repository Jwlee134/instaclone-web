import { isLoggedInVar } from "../apollo";

function Login() {
  return <h1 onClick={() => isLoggedInVar(true)}>Login</h1>;
}

export default Login;
