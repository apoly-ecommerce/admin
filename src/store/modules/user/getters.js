export default {
  getToken(state) {
    return state.token;
  },
  get_nice_name(state) {
    if (state.userInfo.nice_name) {
      return state.userInfo.nice_name;
    }
    return 'Account';
  },
  get_merchant_user(state) {
    return state.userInfo.merchant_user;
  },
  isSpecial_role(state) {
    return state.userInfo.special_role;
  },
  getAccessLevel(state) {
    return state.userInfo.access_level;
  },
  getRole(state) {
    return state.role;
  },
  getRolePermissions(state) {
    return state.role_permissions;
  }
};
