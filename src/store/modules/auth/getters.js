export default {

  getUserAuth(state) {
    return state.userAuth;
  },

  getRoleAuth(state) {
    return state.userAuth.role;
  },

  getTokenAuth(state) {
    return state.tokenAuth;
  }

};