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

  UPDATE_CATEGORY: (state, data) => {
    let { listCategories } = state;
    let index = listCategories.findIndex(item => item.id === data.id );
    if (index !== -1) {
      state.listCategories.splice(index, 1, data);
      console.log(state.listCategories);
    } return;
  }

};