export default {

  SET_CATEGORY_SUB_GROUPS: (state, data) => {
    state.categorySubGroups = data.categorySubGroups;
    state.total = data.total;
  },

  REMOVE_CATEGORY_SUB_GROUP: (state, id) => {
    state.categorySubGroups = state.categorySubGroups.filter(item => item.id !== id);
  },

  REMOVE_CATEGORY_SUB_GROUPS: (state, ids) => {
    state.categorySubGroups = state.categorySubGroups.filter(item => !ids.includes(item.id));
  },
};