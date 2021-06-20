export default {
  SET_USER_AUTH: (state, userAuth) => {
    state.userAuth = userAuth;
  },
  SET_TOKEN_AUTH: (state, tokenAuth) => {
    state.tokenAuth = tokenAuth;
  }
}