export default {

  SET_CATEGORY_SUB_GROUPS: (state, categorySubGroups) => {
    state.listCategorySubGroups = categorySubGroups;
  },

  REMOVE_CATEGORY_SUB_GROUP: (state, id) => {
    state.listCategorySubGroups = state.listCategorySubGroups.filter(item => item.id !== id);
  },

  REMOVE_CATEGORY_SUB_GROUPS: (state, ids) => {
    state.listCategorySubGroups = state.listCategorySubGroups.filter(item => !ids.includes(item.id));
  },
};