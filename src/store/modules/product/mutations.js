export default {

  SET_PRODUCTS: (state, data) => {
    state.products = data.products;
    state.total = data.total;
  },

  REMOVE_PRODUCT: (state, id) => {
    state.products = state.products.filter(item => item.id !== id);
  },

  REMOVE_PRODUCTS: (state, ids) => {
    state.products = state.products.filter(item => !ids.includes(item.id));
  },

};