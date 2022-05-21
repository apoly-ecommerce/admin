import { setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import mapSidebarMenu from '@/layouts/common/sidebar.js'

import {
  login,
  logout,
  fetchUserAuth,
  pusherAuth
} from '@/api/auth';

export default {

  pusherAuth({ commit }, data) {
    return new Promise((resolve, reject) => {
      pusherAuth(data)
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
    });
  },

  login({ commit }, formData) {
    const { email, password }  = formData;
    return new Promise((resolve, reject) => {
      login({email: email.trim(), password})
      .then(res => {
        commit('SET_TOKEN_AUTH', res.data.accessToken);
        setToken(res.data.accessToken);
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
      .then(res => {
        dispatch('resetTokenAuth');
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  resetTokenAuth({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN_AUTH', '');
      commit('SET_USER_AUTH', {});
      commit('app/RESET_SIDEBAR_MENU', {}, { root: true });
      removeToken();
      resetRouter();
      resolve();
    });
  },

  fetchUserAuth({ commit }) {
    return new Promise((resolve, reject) => {
      fetchUserAuth()
      .then(res => {
        commit('SET_USER_AUTH', res.data.user);
        commit('app/SET_SIDEBAR_MAP', { permissions: res.data.user.permissions, mapSidebarMenu }, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  }

};
