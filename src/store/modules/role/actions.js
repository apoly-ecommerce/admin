// Api
import {
  addRole,
  fetchListRole,
  trashRole,
  fetchListRoleTrashed,
  restoreRole,
  destroyRole,
  massTrashRole,
  massDestroyRole,
  massRestoreRole,
  fetchRoleById,
  getRolePermissionsByUser,
  updateRole
} from '@/api/role';

export default {

  getRolePermissionsByUser({ commit }) {
    return new Promise((resolve, reject) => {
      getRolePermissionsByUser().then(res => {
        let { data } = res;
        commit('user/SET_USER_ROLE', data.role, { root: true });
        commit('user/SET_USER_ROLE_PERMISSIONS', data.role_permissions, { root: true });
        resolve(res);
      }).catch(error => reject(error));
    });
  },

  addRole({commit}, roleData) {
    return new Promise((resolve, reject) => {
      addRole(roleData)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updateRole({ commit }, { roleData, roleId }) {
    console.log(roleData);
    return new Promise((resolve, reject) => {
      updateRole(roleData, roleId)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListRole({commit}, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListRole(listQuery)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListRoleTrashed({commit}, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListRoleTrashed(listQuery)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  trashRole({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      trashRole(roleId)
      .then(res => resolve(res.data))
      .catch(error => reject(error))
    });
  },

  restoreRole({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      restoreRole(roleId)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  destroyRole({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      destroyRole(roleId)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  massTrashRole({ commit }, roleIds) {
    return new Promise((resolve, reject) => {
      massTrashRole(roleIds)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  massDestroyRole({ commit }, roleIds) {
    return new Promise((resolve, reject) => {
      massDestroyRole(roleIds)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  massRestoreRole({ commit }, roleIds) {
    return new Promise((resolve, reject) => {
      massRestoreRole(roleIds)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchRoleById({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      fetchRoleById(roleId)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }

};