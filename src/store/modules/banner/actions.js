import {
  addBanner,
  fetchBannerItemById,
  updateBanner,
  fetchListBannerByPaginate,
  fetchListBannerTrashedByPaginate,
  trashBanner,
  massTrashBanner,
  restoreBanner,
  massRestoreBanner,
  destroyBanner,
  massDestroyBanner,
  emptyTrashBanner
} from '@/api/banner';

export default {

  addBanner({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      addBanner(headers, formData)
      .then(res => {
        dispatch('banner/fetchListBannerByPaginate', { limit: 10, page: 1 }, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateBanner({ dispatch }, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateBanner(headers, formData, id)
      .then(res => {
        dispatch('banner/fetchListBannerByPaginate', { limit: 10, page: 1 }, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchBannerItemById({}, id) {
    return  new Promise((resolve, reject) => {
      fetchBannerItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchListBannerByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListBannerByPaginate(query)
      .then(res => {
        commit('banner/SET_BANNERS', res.data.banners, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchListBannerTrashedByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListBannerTrashedByPaginate(query)
      .then(res => {
        commit('banner/SET_BANNERS', res.data.banners, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  trashBanner({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashBanner(id)
      .then(res => {
        commit('banner/REMOVE_BANNER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massTrashBanner({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashBanner(ids)
      .then(res => {
        commit('banner/REMOVE_BANNERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreBanner({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreBanner(id)
      .then(res => {
        commit('banner/REMOVE_BANNER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massRestoreBanner({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreBanner(ids)
      .then(res => {
        commit('banner/REMOVE_BANNERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyBanner({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyBanner(id)
      .then(res => {
        commit('banner/REMOVE_BANNER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massDestroyBanner({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyBanner(ids)
      .then(res => {
        commit('banner/REMOVE_BANNERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  emptyTrashBanner() {
    return new Promise((resolve, reject) => {
      emptyTrashBanner()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
};