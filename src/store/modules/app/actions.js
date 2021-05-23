// Api
import { getAllModules } from '@/api/app';
// Utils
import { getToken } from '@/utils/auth';

export default {
  /**
   * @param {string} name
   */
  handleActiveDropdownMenu({ commit }, name) {
    commit('app/SET_ACTIVE_DROPDOWN_MENU', name, { root: true });
  },

  /**
   * @param {boolean} isLoading
   */
  handleSetIsLoading({ commit }, isLoading) {
    commit('app/SET_IS_LOADING', isLoading, { root: true });
  },

  getAllModules({ commit }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + getToken()
      };
      getAllModules(headers).then(res => {
        let { data } = res;
        commit('app/SET_MODULES_APP', data, { root: true });
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
};