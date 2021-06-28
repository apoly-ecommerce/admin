export default {
  SET_SHOPS: (state, shops) => {
    state.listShop = shops;
  },

  REMOVE_SHOP: (state, id) => {
    state.listShop = state.listShop.filter(item => item.id !== id);
  },

  REMOVE_SHOPS: (state, ids) => {
    state.listShop = state.listShop.filter(item => !ids.includes(item.id));
  },
};