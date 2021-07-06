import {
  setupCategorySubGroup,
  storeCategorySubGroup,
  fetchListCategorySubGroup,
  fetchListCategorySubGroupByPaginate,
  trashCategorySubGroup,
  massTrashCategorySubGroup,
  fetchListCategorySubGroupTrashedByPaginate,
  destroyCategorySubGroup,
  massDestroyCategorySubGroup,
  restoreCategorySubGroup,
  massRestoreCategorySubGroup,
  fetchCategorySubGroupItemById,
  updateCategorySubGroup
} from '@/api/categorySubGroup';

export default {

  setupCategorySubGroup() {
    return new Promise((resolve, reject) => {
      setupCategorySubGroup()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  storeCategorySubGroup({}, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      storeCategorySubGroup(headers, formData)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListCategorySubGroup() {
    return new Promise((resolve, reject) => {
      fetchListCategorySubGroup()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListCategorySubGroupByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListCategorySubGroupByPaginate(listQuery)
      .then(res => {
        commit('categorySubGroup/SET_CATEGORY_SUB_GROUPS', res.data.categorySubGroups, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListCategorySubGroupTrashedByPaginate({ commit }, listQuery) {
    return new Promise((resolve, reject) => {
      fetchListCategorySubGroupTrashedByPaginate(listQuery)
      .then(res => {
        commit('categorySubGroup/SET_CATEGORY_SUB_GROUPS', res.data.categorySubGroups, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  trashCategorySubGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashCategorySubGroup(id)
      .then(res => {
        commit('categorySubGroup/REMOVE_CATEGORY_SUB_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massTrashCategorySubGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashCategorySubGroup(ids)
      .then(res => {
        commit('categorySubGroup/REMOVE_CATEGORY_SUB_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyCategorySubGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyCategorySubGroup(id)
      .then(res => {
        commit('categorySubGroup/REMOVE_CATEGORY_SUB_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massDestroyCategorySubGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyCategorySubGroup(ids)
      .then(res => {
        commit('categorySubGroup/REMOVE_CATEGORY_SUB_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreCategorySubGroup({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreCategorySubGroup(id)
      .then(res => {
        commit('categorySubGroup/REMOVE_CATEGORY_SUB_GROUP', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massRestoreCategorySubGroup({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreCategorySubGroup(ids)
      .then(res => {
        commit('categorySubGroup/REMOVE_CATEGORY_SUB_GROUPS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    })
  },

  fetchCategorySubGroupItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchCategorySubGroupItemById(id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updateCategorySubGroup({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      updateCategorySubGroup(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }

};