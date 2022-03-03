import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useMeQuery } from "../graphql/generated";

function useUser() {
  const navigate = useNavigate();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMeQuery({ skip: !isLoggedIn });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(navigate);
    }
  }, [data, navigate]);

  return data?.me;
}

export default useUser;
