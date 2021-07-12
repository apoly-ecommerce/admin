import {
  setupFormManufacturer,
  storeManufacturer,
  fetchListManufacturer,
  fetchListManufacturerByPaginate,
  fetchListManufacturerTrashedByPaginate,
  trashManufacturer,
  massTrashManufacturer,
  destroyManufacturer,
  massDestroyManufacturer,
  restoreManufacturer,
  massRestoreManufacturer,
  fetchManufacturerItemById,
  updateManufacturer,
  emptyTrashManufacturer
} from '@/api/manufacturer';

export default {

  setupFormManufacturer() {
    return new Promise((resolve, reject) => {
      setupFormManufacturer()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  storeManufacturer({}, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      storeManufacturer(headers, formData)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListManufacturer({}) {
    return new Promise((resolve, reject) => {
      fetchListManufacturer()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListManufacturerByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListManufacturerByPaginate(listQuery)
      .then(res => {
        commit('manufacturer/SET_MANUFACTURERS', res.data, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListManufacturerTrashedByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListManufacturerTrashedByPaginate(listQuery)
      .then(res => {
        commit('manufacturer/SET_MANUFACTURERS', res.data, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  trashManufacturer({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashManufacturer(id)
      .then(res => {
        commit('manufacturer/REMOVE_MANUFACTURER', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massTrashManufacturer({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashManufacturer(ids)
      .then(res => {
        commit('manufacturer/REMOVE_MANUFACTURERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyManufacturer({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyManufacturer(id)
      .then(res => {
        commit('manufacturer/REMOVE_MANUFACTURER', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massDestroyManufacturer({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyManufacturer(ids)
      .then(res => {
        commit('manufacturer/REMOVE_MANUFACTURERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreManufacturer({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreManufacturer(id)
      .then(res => {
        commit('manufacturer/REMOVE_MANUFACTURER', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massRestoreManufacturer({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreManufacturer(ids)
      .then(res => {
        commit('manufacturer/REMOVE_MANUFACTURERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    })
  },

  fetchManufacturerItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchManufacturerItemById(id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updateManufacturer({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      updateManufacturer(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  emptyTrashManufacturer() {
    return new Promise((resolve, reject) => {
      emptyTrashManufacturer()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
};