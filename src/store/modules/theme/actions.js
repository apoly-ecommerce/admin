import {
  fetchListThemeOptions,
  editFeaturedBrands,
  updateFeaturedBrands,
  editTrendingNowCategories,
  updateTrendingNowCategories
} from '@/api/theme';

export default {

  fetchListThemeOptions({ commit }) {
    return new Promise((resolve, reject) => {
      fetchListThemeOptions()
      .then(res => {
        commit('theme/SET_FEATURED_BRANDS', res.data.featured_brands, { root: true });
        commit('theme/SET_TRENDING_CATEGORIES', res.data.trending_categories, { root: true });
        resolve(res.data);
      })
      .catch((err) => reject(err));
    })
  },

  // FeatureBrands
  editFeaturedBrands() {
    return new Promise((resolve, reject) => {
      editFeaturedBrands()
      .then(res => resolve(res.data))
      .catch((err) => reject(err));
    });
  },

  updateFeaturedBrands({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      updateFeaturedBrands(formData)
      .then(res => {
        dispatch('fetchListThemeOptions');
        resolve(res.data)
      })
      .catch((err) => reject(err));
    })
  },

  // Trending Now Categories
  editTrendingNowCategories() {
    return new Promise((resolve, reject) => {
      editTrendingNowCategories()
      .then(res => resolve(res.data))
      .catch((err) => reject(err));
    });
  },

  updateTrendingNowCategories({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      updateTrendingNowCategories(formData)
      .then(res => {
        dispatch('fetchListThemeOptions');
        resolve(res.data)
      })
      .catch((err) => reject(err));
    });
  }
};