export default {

  SET_MERCHANTS: (state, data) => {
    state.merchants = data.merchants;
    state.total = data.total;
  },

  REMOVE_MERCHANT: (state, id) => {
    state.merchants = state.merchants.filter(item => item.id !== id);
  },

  REMOVE_MERCHANTS: (state, ids) => {
    state.merchants = state.merchants.filter(item => !ids.includes(item.id));
  },

  REMOVE_MERCHANT_BY_SHOP: (state, shop_id) => {
    state.merchants = state.merchants.filter(item => item.owns.id !== shop_id)
  },

  REMOVE_MERCHANTS_BY_SHOPS: (state, shop_ids) => {
    state.merchants = state.merchants.filter(item => !shop_ids.includes(item.owns.id));
  }
};