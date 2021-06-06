import { login, getInfo, logout } from '@/api/user';
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
        console.log(res);
        const { data } = res;
        commit('user/SET_TOKEN', data.accessToken, { root: true });
        setToken(data.accessToken);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('user/SET_TOKEN', '', { root: true });
        commit('user/SET_ROLE', '', { root: true });
        commit('user/RESET_USER_INFO', '', { root: true });
        removeToken();
        resetRouter();
        resolve(res.data);
      }).catch(error => {
          reject(error);
      });
    });
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        commit('user/SET_USER_INFO', res.data.user, { root: true })
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('user/SET_TOKEN', '', { root: true });
      commit('user/SET_ROLE', '', { root: true });
      commit('user/RESET_USER_INFO', '', { root: true });
      removeToken();
      resolve();
    });
  }
};