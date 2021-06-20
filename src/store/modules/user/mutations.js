export default {

  /**
   * Set api token
   * @param {String} token
   */
  SET_TOKEN: (state, token) => {
    state.token = token;
  },

  SET_ROLE: (state, name) => {
    state.roles = name;
  },

  SET_ROLE_LEVEL: (state, roleLevel) => {
    state.roleLevel = roleLevel;
  },

  SET_PERMISSION: (state, permissions) => {
    state.permissions = permissions;
  },

  SET_ROLE_DESCRIPTION: (state, roleDescription) => {
    state.roleDescription = roleDescription;
  },

  SET_ROLE_ID: (state, roleId) => {
    state.roleId = roleId;
  },

  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },

  RESET_USER_INFO: (state) => {
    state.userInfo = {};
  },

  SET_USER_ROLE: (state, role) => {
    state.role = role;
  },

  SET_USER_ROLE_PERMISSIONS: (state, role_permissions) => {
    state.role_permissions = role_permissions;
  },

  SET_USERS: (state, users) => {
    if (users) state.listUser = users;
  },

  ADD_CATEGORY_GROUP_ITEM: (state, catGrpItem) => {
    state.listUser.unshift(catGrpItem);
  },

  REMOVE_CATEGORY_GROUP: (state, id) => {
    state.listUser = state.listUser.filter(item => item.id !== id);
  },

  REMOVE_USER: (state, id) => {
    state.listUser = state.listUser.filter(item => item.id !== id);
  },

  REMOVE_USERS: (state, ids) => {
    state.listUser = state.listUser.filter(item => !ids.includes(item.id));
  },

};