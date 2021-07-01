import {
  storeUser,
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

  storeUser({}, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      storeUser(headers, formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchListUser() {
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

  fetchUserItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchUserItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updateUser({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateUser(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updatePasswordUser({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      updatePasswordUser(formData, id)
      .then(res =>  resolve(res.data) )
      .catch(err => reject(err));
    });
  },

  emptyTrashUser() {
    return new Promise((resolve, reject) => {
      emptyTrashUser()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }

};