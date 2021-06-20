import {
  addProduct,
  fetchListProduct,
  fetchListProductByPaginate,
  fetchListProductTrashedByPaginate,
  trashProduct,
  massTrashProduct,
  destroyProduct,
  massDestroyProduct,
  restoreProduct,
  massRestoreProduct,
  fetchProductItemById,
  updateProduct,
  emptyTrashProduct,
} from '@/api/product';

export default {

  addProduct({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      addProduct(headers, formData)
      .then(res => {
        console.log(res);
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListProduct({ commit }) {
    return new Promise((resolve, reject) => {
      fetchListProduct()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListProductByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListProductByPaginate(listQuery)
      .then(res => {
        commit('product/SET_PRODUCTS', res.data.products, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListProductTrashedByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListProductTrashedByPaginate(listQuery)
      .then(res => {
        commit('product/SET_PRODUCTS', res.data.products, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  trashProduct({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashProduct(id)
      .then(res => {
        commit('product/REMOVE_PRODUCT', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massTrashProduct({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashProduct(ids)
      .then(res => {
        commit('product/REMOVE_PRODUCTS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyProduct({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyProduct(id)
      .then(res => {
        commit('product/REMOVE_PRODUCT', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massDestroyProduct({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyProduct(ids)
      .then(res => {
        commit('product/REMOVE_PRODUCTS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreProduct({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreProduct(id)
      .then(res => {
        commit('product/REMOVE_PRODUCT', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massRestoreProduct({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreProduct(ids)
      .then(res => {
        commit('product/REMOVE_PRODUCTS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    })
  },

  fetchProductItemById({ commit }, id) {
    return new Promise((resolve, reject) => {
      fetchProductItemById(id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updateProduct({ commit }, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      updateProduct(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  emptyTrashProduct({ commit }) {
    return new Promise((resolve, reject) => {
      emptyTrashProduct()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
};