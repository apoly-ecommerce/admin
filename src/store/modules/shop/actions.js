import {
  setupFormShop,
  fetchShopItemById,
  fetchListShopByPaginate,
  fetchListShopTrashedByPaginate,
  updateShop,
  trashShop,
  restoreShop,
  massTrashShop,
  massRestoreShop,
  destroyShop,
  massDestroyShop,
  emptyTrashShop
} from '@/api/shop';

export default {

  setupFormShop() {
    return new Promise((resolve, reject) => {
      setupFormShop()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchShopItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchShopItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchListShopByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListShopByPaginate(query)
      .then(res => {
        commit('shop/SET_SHOPS', res.data, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchListShopTrashedByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListShopTrashedByPaginate(query)
      .then(res => {
        commit('shop/SET_SHOPS', res.data, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateShop({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateShop(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  trashShop({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashShop(id)
      .then(res => {
        commit('shop/REMOVE_SHOP', id, { root: true });
        resolve(res.data)
      })
      .catch (err => reject(err));
    });
  },

  restoreShop({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreShop(id)
      .then(res => {
        commit('shop/REMOVE_SHOP', id, { root: true });
        resolve(res.data)
      })
      .catch (err => reject(err));
    });
  },

  massTrashShop({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashShop(ids)
      .then(res => {
        commit('shop/REMOVE_SHOPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massRestoreShop({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreShop(ids)
      .then(res => {
        commit('shop/REMOVE_SHOPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  destroyShop({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyShop(id)
      .then(res => {
        commit('shop/REMOVE_SHOP', id, { root: true });
        commit('merchant/REMOVE_MERCHANT_BY_SHOP', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massDestroyShop({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyShop(ids)
      .then(res => {
        commit('shop/REMOVE_SHOPS', ids, { root: true });
        commit('merchant/REMOVE_MERCHANTS_BY_SHOPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  emptyTrashShop() {
    return new Promise((resolve, reject) => {
      emptyTrashShop()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }

};