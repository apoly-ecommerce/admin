export default {

  SET_CATEGORY_SUB_GROUPS: (state, categorySubGroups) => {
    state.listCategorySubGroups = categorySubGroups;
  },

  ADD_CATEGORY_SUB_GROUP_ITEM: (state, categorySubGroupItem) => {
    state.listCategorySubGroups.unshift(categorySubGroupItem);
  },

  REMOVE_CATEGORY_SUB_GROUP: (state, id) => {
    state.listCategorySubGroups = state.listCategorySubGroups.filter(item => item.id !== id);
  },

  REMOVE_CATEGORY_SUB_GROUPS: (state, ids) => {
    state.listCategorySubGroups = state.listCategorySubGroups.filter(item => !ids.includes(item.id));
  },

  UPDATE_CATEGORY_GROUP: (state, data) => {
    let { listCategorySubGroups } = state;
    let index = listCategorySubGroups.findIndex(item => item.id === data.id );
    if (index !== -1) {
      state.listCategorySubGroups.splice(index, 1, data);
      console.log(state.listCategorySubGroups);
    } return;
  }

};