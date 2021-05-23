import { getStateByCountryId } from '@/api/state';

export default {
  /**
   * Get states by country id
   */
   getStatesByCountryId({ commit }, countryId) {
    return new Promise((resolve, reject) => {
      getStateByCountryId(countryId).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
};