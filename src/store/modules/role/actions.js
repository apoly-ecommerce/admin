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
  massRestoreRole
} from '@/api/role';
// Utils
import { getToken } from '@/utils/auth';

export default {

  addRole({commit}, roleData) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken()
        },
        data: roleData,
      };
      addRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  fetchListRole({commit}, listQuery) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken()
        },
        params: listQuery
      };
      fetchListRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        console.error(error);
        reject(error);
      });
    });
  },

  fetchListRoleTrashed({commit}, listQuery) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken()
        },
        params: listQuery
      };
      fetchListRoleTrashed(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  trashRole({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken(),
        },
        id: roleId
      };
      trashRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      })
    });
  },

  restoreRole({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken(),
        },
        id: roleId
      };
      restoreRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error)
      });
    });
  },

  destroyRole({ commit }, roleId) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken(),
        },
        id: roleId
      };
      destroyRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  massTrashRole({ commit }, roleIds) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken(),
        },
        ids: roleIds
      };
      massTrashRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  massDestroyRole({ commit }, roleIds) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken(),
        },
        ids: roleIds
      };
      massDestroyRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  massRestoreRole({ commit }, roleIds) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + getToken(),
        },
        ids: roleIds
      };
      massRestoreRole(config).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

};