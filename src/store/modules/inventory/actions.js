import {
  setupFormInventory,
  addInventory,
  storeInventory,
  fetchInventoryItemById,
  editInventory,
  updateInventory,
  fetchListInventoryByPaginate,
  fetchListInventoryTrashedByPaginate,
  trashInventory,
  massTrashInventory,
  restoreInventory,
  massRestoreInventory,
  destroyInventory,
  massDestroyInventory,
  emptyTrashInventory
} from '@/api/inventory';

export default {

  setupFormInventory() {
    return new Promise( (resolve, reject) => {
      setupFormInventory()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  addInventory({}, productId) {
    return new Promise((resolve, reject) => {
      addInventory(productId)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  storeInventory({}, formData) {
    return new Promise((resolve, reject) => {
      storeInventory(formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchInventoryItemById({}, id) {
    return  new Promise((resolve, reject) => {
      fetchInventoryItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  editInventory({}, id) {
    return  new Promise((resolve, reject) => {
      editInventory(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updateInventory({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      updateInventory(formData, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchListInventoryByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListInventoryByPaginate(query)
      .then(res => {
        commit('inventory/SET_INVENTORIES', res.data, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchListInventoryTrashedByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListInventoryTrashedByPaginate(query)
      .then(res => {
        commit('inventory/SET_INVENTORIES', res.data, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  trashInventory({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashInventory(id)
      .then(res => {
        commit('inventory/REMOVE_INVENTORY', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massTrashInventory({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashInventory(ids)
      .then(res => {
        commit('inventory/REMOVE_INVENTORIES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreInventory({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreInventory(id)
      .then(res => {
        commit('inventory/REMOVE_INVENTORY', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massRestoreInventory({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreInventory(ids)
      .then(res => {
        commit('inventory/REMOVE_INVENTORIES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyInventory({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyInventory(id)
      .then(res => {
        commit('inventory/REMOVE_INVENTORY', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massDestroyInventory({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyInventory(ids)
      .then(res => {
        commit('inventory/REMOVE_INVENTORIES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  emptyTrashInventory() {
    return new Promise((resolve, reject) => {
      emptyTrashInventory()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }

}