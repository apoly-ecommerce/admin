export default {

  SET_BANNERS: (state, banners) => {
    state.listBanner = banners;
  },

  REMOVE_BANNER: (state, id) => {
    state.listBanner = state.listBanner.filter(item => item.id !== id);
  },

  REMOVE_BANNERS: (state, ids) => {
    state.listBanner = state.listBanner.filter(item => !ids.includes(item.id));
  },
};