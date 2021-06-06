export default {

  SET_PRODUCTS: (state, products) => {
    state.listProduct = products;
  },

  REMOVE_PRODUCT: (state, id) => {
    state.listProduct = state.listProduct.filter(item => item.id !== id);
  },

  REMOVE_PRODUCTS: (state, ids) => {
    state.listProduct = state.listProduct.filter(item => !ids.includes(item.id));
  },

  UPDATE_PRODUCT: (state, data) => {
    let { listProduct } = state;
    let index = listProduct.findIndex(item => item.id === data.id );
    if (index !== -1) {
      state.listProduct.splice(index, 1, data);
    } return;
  }

};