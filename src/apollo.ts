import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { NavigateFunction } from "react-router-dom";
import routes from "./routes";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "darkMode";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const isDarkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => ({
  headers: { ...headers, token: localStorage.getItem(TOKEN) },
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // 기본적으로 유니크 필드인 id를 통해 캐시를 생성하는데 (User:1) 만약 id를 쿼리하지 않을 경우 어쨌든 캐시를 생성하기 위해 다른 유니크 필드를 설정 (User:username)
    typePolicies: { User: { keyFields: (obj) => `User:${obj.username}` } },
  }),
});

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (navigate: NavigateFunction) => {
  localStorage.removeItem(TOKEN);
  navigate(routes.home, { replace: true });
  isLoggedInVar(false);
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  isDarkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  isDarkModeVar(false);
};
