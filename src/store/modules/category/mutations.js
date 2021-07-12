export default {

  SET_CATEGORIES: (state, data) => {
    state.categories = data.categories;
    state.total = data.total;
  },

  REMOVE_CATEGORY: (state, id) => {
    state.categories = state.categories.filter(item => item.id !== id);
  },

  REMOVE_CATEGORIES: (state, ids) => {
    state.categories = state.categories.filter(item => !ids.includes(item.id));
  },

};