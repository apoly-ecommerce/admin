export default {

  SET_CUSTOMERS: (state, customers) => {
    state.listCustomer = customers;
  },

  REMOVE_CUSTOMER: (state, id) => {
    state.listCustomer = state.listCustomer.filter(item => item.id !== id);
  },

  REMOVE_CUSTOMERS: (state, ids) => {
    state.listCustomer = state.listCustomer.filter(item => !ids.includes(item.id));
  },

  UPDATE_PRODUCT: (state, data) => {
    let { listProduct } = state;
    let index = listProduct.findIndex(item => item.id === data.id );
    if (index !== -1) {
      state.listCustomer.splice(index, 1, data);
    } return;
  }

};