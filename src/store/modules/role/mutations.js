export default {

  SET_ROLES: (state, data) => {
    state.roles = data.roles;
    state.total = data.total;
  },

  REMOVE_ROLE: (state, id) => {
    state.roles = state.roles.filter(item => item.id !== id);
  },

  REMOVE_ROLES: (state, ids) => {
    state.roles = state.roles.filter(item => !ids.includes(item.id));
  },

};