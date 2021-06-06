import { fetchListCountries } from '@/api/country';

export default {
  /**
   * Get all countries
   */
  fetchListCountries({ commit }) {
    return new Promise((resolve, reject) => {
        fetchListCountries().then(res => {
        commit('country/SET_COUNTRIES', res.data.countries, { root: true });
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  }
};