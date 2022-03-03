import { gql, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { useMeQuery } from "../graphql/generated";

const ME_QUERY = gql`
  query me {
    me {
      avatar
      username
    }
  }
`;

function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMeQuery({ skip: !isLoggedIn });
  console.log(data?.me);
}

export default useUser;
