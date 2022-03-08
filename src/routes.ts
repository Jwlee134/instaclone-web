const routes = {
  home: "/",
  signUp: "/sign-up",
  profile: (username: string) => `/user/${username}`,
};

export default routes;
