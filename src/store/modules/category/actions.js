import {
  setupFormCategory,
  storeCategory,
  fetchListCategory,
  fetchCategoryByPaginate,
  fetchListCategoryTrashedByPaginate,
  trashCategory,
  massTrashCategory,
  destroyCategory,
  massDestroyCategory,
  restoreCategory,
  massRestoreCategory,
  fetchCategoryItemById,
  updateCategory,
} from '@/api/category';

export default {

  setupFormCategory() {
    return new Promise((resolve, reject) => {
      setupFormCategory()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  storeCategory({}, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      storeCategory(headers, formData)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListCategory() {
    return new Promise((resolve, reject) => {
      fetchListCategory()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchCategoryByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchCategoryByPaginate(listQuery)
      .then(res => {
        commit('category/SET_CATEGORIES', res.data.categories, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListCategoryTrashedByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListCategoryTrashedByPaginate(listQuery)
      .then(res => {
        commit('category/SET_CATEGORIES', res.data.categories, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  trashCategory({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashCategory(id)
      .then(res => {
        commit('category/REMOVE_CATEGORY', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massTrashCategory({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashCategory(ids)
      .then(res => {
        commit('category/REMOVE_CATEGORIES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyCategory({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyCategory(id)
      .then(res => {
        commit('category/REMOVE_CATEGORY', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massDestroyCategory({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyCategory(ids)
      .then(res => {
        commit('category/REMOVE_CATEGORIES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreCategory({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreCategory(id)
      .then(res => {
        commit('category/REMOVE_CATEGORY', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massRestoreCategory({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreCategory(ids)
      .then(res => {
        commit('category/REMOVE_CATEGORIES', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    })
  },

  fetchCategoryItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchCategoryItemById(id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updateCategory({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      updateCategory(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
};