import { getAllCountries } from '@/api/country';

export default {
  /**
   * Get all countries
   */
  getAllCountries({ commit }) {
    return new Promise((resolve, reject) => {
      getAllCountries().then(res => {
        commit('country/SET_COUNTRIES', res.data, { root: true });
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
};