export default {

  SET_BANNERS: (state, data) => {
    state.banners = data.banners;
    state.total = data.total;
  },

  REMOVE_BANNER: (state, id) => {
    state.banners = state.banners.filter(item => item.id !== id);
  },

  REMOVE_BANNERS: (state, ids) => {
    state.banners = state.banners.filter(item => !ids.includes(item.id));
  },
};