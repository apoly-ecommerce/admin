export default {

  SET_MERCHANTS: (state, merchants) => {
    state.listMerchant = merchants;
  },

  REMOVE_MERCHANT: (state, id) => {
    state.listMerchant = state.listMerchant.filter(item => item.id !== id);
  },

  REMOVE_MERCHANTS: (state, ids) => {
    state.listMerchant = state.listMerchant.filter(item => !ids.includes(item.id));
  },

  REMOVE_MERCHANT_BY_SHOP: (state, shop_id) => {
    state.listMerchant = state.listMerchant.filter(item => item.owns.id !== shop_id)
  },

  REMOVE_MERCHANTS_BY_SHOPS: (state, shop_ids) => {
    state.listMerchant = state.listMerchant.filter(item => !shop_ids.includes(item.owns.id));
  }
};