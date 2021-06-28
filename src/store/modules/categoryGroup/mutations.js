export default {

  SET_CATEGORY_GROUPS: (state, categoryGroups) => {
    if (categoryGroups) state.listCategoryGroups = categoryGroups;
  },

  REMOVE_CATEGORY_GROUP: (state, id) => {
    state.listCategoryGroups = state.listCategoryGroups.filter(item => item.id !== id);
  },

  REMOVE_CATEGORY_GROUPS: (state, ids) => {
    state.listCategoryGroups = state.listCategoryGroups.filter(item => !ids.includes(item.id));
  },
};