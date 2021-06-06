export default {

  SET_CATEGORY_GROUPS: (state, categoryGroups) => {
    if (categoryGroups) state.listCategoryGroups = categoryGroups;
  },

  ADD_CATEGORY_GROUP_ITEM: (state, catGrpItem) => {
    state.listCategoryGroups.unshift(catGrpItem);
  },

  REMOVE_CATEGORY_GROUP: (state, id) => {
    state.listCategoryGroups = state.listCategoryGroups.filter(item => item.id !== id);
  },

  REMOVE_CATEGORY_GROUPS: (state, ids) => {
    state.listCategoryGroups = state.listCategoryGroups.filter(item => !ids.includes(item.id));
  },

  UPDATE_CATEGORY_GROUP: (state, data) => {
    let { listCategoryGroups } = state;
    let index = listCategoryGroups.findIndex(item => item.id === data.id );
    if (index !== -1) {
      state.listCategoryGroups.splice(index, 1, data);
      console.log(state.listCategoryGroups);
    } return;
  }
};