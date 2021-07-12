export default {
  SET_SHOPS: (state, data) => {
    state.shops = data.shops;
    state.total = data.total;
  },

  REMOVE_SHOP: (state, id) => {
    state.shops = state.shops.filter(item => item.id !== id);
  },

  REMOVE_SHOPS: (state, ids) => {
    state.shops = state.shops.filter(item => !ids.includes(item.id));
  },
};