import { fetchListStateByCountryId } from '@/api/state';

export default {
  /**
   * Get states by country id
   */
   fetchListStateByCountryId({ commit }, countryId) {
    return new Promise((resolve, reject) => {
      fetchListStateByCountryId(countryId).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
};