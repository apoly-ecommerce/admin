export default {

  getUserAuth(state) {
    // return state.userAuth;
    if (state.userAuth) {
      return state.userAuth;
    } return null;
  },

  getRoleAuth(state) {
    if (state.userAuth) {
      return state.userAuth.role;
    } return null;
  },

  getTokenAuth(state) {
    if (state.tokenAuth) {
      return state.tokenAuth;
    } return null;
  }

};