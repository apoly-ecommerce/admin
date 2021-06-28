import {
  addCategoryGroup,
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
  updateCategoryGroup
} from '@/api/categoryGroup';

export default {

  addCategoryGroup({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      addCategoryGroup(headers, formData)
      .then(res => {
        dispatch('categoryGroup/fetchListCategoryGroupByPaginate', { limit: 10, page: 1 }, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListCategoryGroup({}) {
    return new Promise((resolve, reject) => {
      fetchListCategoryGroup()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListCategoryGroupByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListCategoryGroupByPaginate(listQuery)
      .then(res => {
        commit('categoryGroup/SET_CATEGORY_GROUPS', res.data.categoryGroups, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListCategoryGroupTrashedByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListCategoryGroupTrashedByPaginate(listQuery)
      .then(res => {
        commit('categoryGroup/SET_CATEGORY_GROUPS', res.data.categoryGroups, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  trashCategoryGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashCategoryGroup(id)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massTrashCategoryGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashCategoryGroup(ids)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyCategoryGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyCategoryGroup(id)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massDestroyCategoryGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyCategoryGroup(ids)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreCategoryGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreCategoryGroup(id)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massRestoreCategoryGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreCategoryGroup(ids)
      .then(res => {
        commit('categoryGroup/REMOVE_CATEGORY_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchCategoryGroupItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchCategoryGroupItemById(id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updateCategoryGroup({ dispatch }, { data, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateCategoryGroup(headers, data, id)
      .then(res => {
        dispatch('categoryGroup/fetchListCategoryGroupByPaginate', { limit: 10, page: 1 }, { root: true });
        resolve(res.data)
      })
      .catch(error => reject(error));
    });
  }


};