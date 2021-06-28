import { setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

import {
  login,
  logout,
  fetchUserAuth
} from '@/api/auth';

export default {

  login({ commit }, formData) {
    const { email, password }  = formData;
    return new Promise((resolve, reject) => {
      login({email: email.trim(), password})
      .then(res => {
        commit('auth/SET_TOKEN_AUTH', res.data.accessToken, { root: true });
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
      commit('auth/SET_TOKEN_AUTH', '', { root: true });
      commit('auth/SET_USER_AUTH', {}, { root: true });
      removeToken();
      resetRouter();
      resolve();
    });
  },

  fetchUserAuth({ commit }) {
    return new Promise((resolve, reject) => {
      fetchUserAuth()
      .then(res => {
        commit('auth/SET_USER_AUTH', res.data.user, { root: true});
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  }

};