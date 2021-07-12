import {
  storeCategoryGroup,
  fetchListCategoryGroupByPaginate,
  fetchListCategoryGroup,
  trashCategoryGroup,
  massTrashCategoryGroup,
  fetchListCategoryGroupTrashedByPaginate,
  destroyCategoryGroup,
  massDestroyCategoryGroup,
  restoreCategoryGroup,
  massRestoreCategoryGroup,
  fetchCategoryGroupItemById,
  updateCategoryGroup,
  emptyTrashCategoryGroup
} from '@/api/categoryGroup';

export default {

  storeCategoryGroup({}, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      storeCategoryGroup(headers, formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchListCategoryGroup({}) {
    return new Promise((resolve, reject) => {
      fetchListCategoryGroup()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchListCategoryGroupByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListCategoryGroupByPaginate(listQuery)
      .then(res => {
        commit('categoryGroup/SET_CATEGORY_GROUPS', res.data, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchListCategoryGroupTrashedByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListCategoryGroupTrashedByPaginate(listQuery)
      .then(res => {
        commit('categoryGroup/SET_CATEGORY_GROUPS', res.data, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  trashCategoryGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashCategoryGroup(id)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massTrashCategoryGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashCategoryGroup(ids)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  destroyCategoryGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyCategoryGroup(id)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massDestroyCategoryGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyCategoryGroup(ids)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  restoreCategoryGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreCategoryGroup(id)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massRestoreCategoryGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreCategoryGroup(ids)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchCategoryGroupItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchCategoryGroupItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updateCategoryGroup({}, { data, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateCategoryGroup(headers, data, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  emptyTrashCategoryGroup() {
    return new Promise((resolve, reject) => {
      emptyTrashCategoryGroup()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }

};