export default {

  SET_CATEGORY_GROUPS: (state, data) => {
    state.categoryGroups = data.categoryGroups;
    state.total = data.total;
  },

  REMOVE_CATEGORY_GROUP: (state, id) => {
    state.categoryGroups = state.categoryGroups.filter(item => item.id !== id);
  },

  REMOVE_CATEGORY_GROUPS: (state, ids) => {
    state.categoryGroups = state.categoryGroups.filter(item => !ids.includes(item.id));
  },
};