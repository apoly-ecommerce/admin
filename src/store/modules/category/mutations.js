export default {

  SET_CATEGORIES: (state, categories) => {
    state.listCategories = categories;
  },

  REMOVE_CATEGORY: (state, id) => {
    state.listCategories = state.listCategories.filter(item => item.id !== id);
  },

  REMOVE_CATEGORIES: (state, ids) => {
    state.listCategories = state.listCategories.filter(item => !ids.includes(item.id));
  },

};