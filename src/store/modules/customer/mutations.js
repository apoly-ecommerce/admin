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

};