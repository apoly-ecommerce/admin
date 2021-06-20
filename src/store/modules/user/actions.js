import { setToken, removeToken, getToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';
import {
  login,
  getInfo,
  logout,
  addUser,
  fetchListUser,
  fetchListUserByPaginate,
  fetchListUserTrashedByPaginate,
  trashUser,
  massTrashUser,
  destroyUser,
  massDestroyUser,
  restoreUser,
  massRestoreUser,
  fetchUserItemById,
  updateUser,
  updatePasswordUser,
  emptyTrashUser
} from '@/api/user';

export default {

  login({ commit }, userInfo) {
    const { email, password }  = userInfo;
    return new Promise((resolve, reject) => {
      login({email: email.trim(), password: password})
      .then(res => {
        const { data } = res;
        commit('user/SET_TOKEN', data.accessToken, { root: true });
        setToken(data.accessToken);
        resolve();
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
      .then(res => {
        commit('user/SET_TOKEN', '', { root: true });
        commit('user/SET_ROLE', '', { root: true });
        commit('user/RESET_USER_INFO', '', { root: true });
        removeToken();
        resetRouter();
        resolve(res.data);
      })
      .catch(err => {
          reject(err);
      });
    });
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
      .then(res => {
        commit('user/SET_USER_INFO', res.data.user, { root: true })
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
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
  },

  addUser({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      addUser(headers, formData)
      .then(res => {
        console.log(res);
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchListUser({ commit }) {
    return new Promise((resolve, reject) => {
      fetchListUser()
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    });
  },

  fetchListUserByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListUserByPaginate(listQuery)
      .then(res => {
        commit('user/SET_USERS', res.data.users, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchListUserTrashedByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListUserTrashedByPaginate(listQuery)
      .then(res => {
        commit('user/SET_USERS', res.data.users, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  trashUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashUser(id)
      .then(res => {
        commit('user/REMOVE_USER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massTrashUser({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashUser(ids)
      .then(res => {
        commit('user/REMOVE_USERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  destroyUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyUser(id)
      .then(res => {
        commit('user/REMOVE_USER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massDestroyUser({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyUser(ids)
      .then(res => {
        commit('user/REMOVE_USERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  restoreUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreUser(id)
      .then(res => {
        commit('user/REMOVE_USER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massRestoreUser({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreUser(ids)
      .then(res => {
        commit('user/REMOVE_USERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchUserItemById({ commit }, id) {
    return new Promise((resolve, reject) => {
      fetchUserItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updateUser({ commit }, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateUser(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updatePasswordUser({ commit }, { formData, id }) {
    return new Promise((resolve, reject) => {
      updatePasswordUser(formData, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  emptyTrashUser({ commit }) {
    return new Promise((resolve, reject) => {
      emptyTrashUser()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }

};