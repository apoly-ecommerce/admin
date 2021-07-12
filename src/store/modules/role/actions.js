import {
  storeRole,
  fetchListRoleByPaginate,
  trashRole,
  fetchListRoleTrashedByPaginate,
  restoreRole,
  destroyRole,
  massTrashRole,
  massDestroyRole,
  massRestoreRole,
  fetchRoleById,
  fetchRolePermissionsByUser,
  updateRole,
  fetchListRole,
  emptyTrashRole
} from '@/api/role';

export default {

  fetchRolePermissionsByUser() {
    return new Promise((resolve, reject) => {
      fetchRolePermissionsByUser()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  storeRole({}, formData) {
    return new Promise((resolve, reject) => {
      storeRole(formData)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updateRole({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      updateRole(formData, id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListRole() {
    return new Promise((resolve, reject) => {
      fetchListRole()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListRoleByPaginate({commit}, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListRoleByPaginate(listQuery)
      .then(res => {
        commit('role/SET_ROLES', res.data, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListRoleTrashedByPaginate({commit}, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListRoleTrashedByPaginate(listQuery)
      .then(res => {
        commit('role/SET_ROLES', res.data, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  trashRole({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashRole(id)
      .then(res => {
        commit('role/REMOVE_ROLE', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error))
    });
  },

  restoreRole({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreRole(id)
      .then(res => {
        commit('role/REMOVE_ROLE', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyRole({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyRole(id)
      .then(res => {
        commit('role/REMOVE_ROLE', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massTrashRole({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashRole(ids)
      .then(res => {
        commit('role/REMOVE_ROLES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massDestroyRole({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyRole(ids)
      .then(res => {
        commit('role/REMOVE_ROLES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massRestoreRole({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreRole(ids)
      .then(res => {
        commit('role/REMOVE_ROLES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchRoleById({}, id) {
    return new Promise((resolve, reject) => {
      fetchRoleById(id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  emptyTrashRole() {
    return new Promise((resolve, reject) => {
      emptyTrashRole()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }

};