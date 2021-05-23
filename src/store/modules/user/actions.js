import { login, getInfo, logout, getUserRole } from '@/api/user';
import { setToken, removeToken, getToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';

export default {
  /**
   * Check login
   *
   * @param {Object} userInfo
   */
  login({ commit }, userInfo) {
    const { email, password }  = userInfo;
    return new Promise((resolve, reject) => {
      login({email: email.trim(), password: password}).then(res => {
        const { data } = res;
        commit('user/SET_TOKEN', data.api_token, { root: true });
        setToken(data.api_token);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + getToken()
      };
      logout(headers).then(res => {

        commit('user/SET_TOKEN', '', { root: true });
        commit('user/SET_ROLE', '', { root: true });
        commit('user/RESET_USER_INFO', '', { root: true });

        removeToken();
        resetRouter();

        resolve(res);

      }).catch(error => {
          reject(error);
      });
    });
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + getToken()
      };
      getInfo(headers).then(res => {
        commit('user/SET_USER_INFO', res.data, { root: true })
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  },

  getUserRole({ commit }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + getToken()
      };
      getUserRole(headers).then(res => {
        let { data } = res;
        console.log(data);
        commit('user/SET_USER_ROLE', data.role, { root: true });
        commit('user/SET_USER_ROLE_PERMISSIONS', data.role_permissions, { root: true });
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
};