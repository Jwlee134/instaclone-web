import { isLoggedInVar } from "../apollo";

function Home() {
  return <h1 onClick={() => isLoggedInVar(false)}>Home</h1>;
}

export default Home;
