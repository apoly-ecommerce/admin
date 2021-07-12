export default {

  SET_USERS: (state, data) => {
    state.users = data.users;
    state.total = data.total;
  },

  REMOVE_USER: (state, id) => {
    state.users = state.users.filter(item => item.id !== id);
  },

  REMOVE_USERS: (state, ids) => {
    state.users = state.users.filter(item => !ids.includes(item.id));
  },

};