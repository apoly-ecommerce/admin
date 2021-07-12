export default {

  SET_CUSTOMERS: (state, data) => {
    state.customers = data.customers;
    state.total = data.total;
  },

  REMOVE_CUSTOMER: (state, id) => {
    state.customers = state.customers.filter(item => item.id !== id);
  },

  REMOVE_CUSTOMERS: (state, ids) => {
    state.customers = state.customers.filter(item => !ids.includes(item.id));
  },

};