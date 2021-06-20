export default {

  SET_ROLES: (state, roles) => {
    state.listRole = roles;
  },

  REMOVE_ROLE: (state, id) => {
    state.listRole = state.listRole.filter(item => item.id !== id);
  },

  REMOVE_ROLES: (state, ids) => {
    state.listRole = state.listRole.filter(item => !ids.includes(item.id));
  },

};