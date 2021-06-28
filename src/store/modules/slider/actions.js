import {
  addSlider,
  fetchSliderItemById,
  updateSlider,
  fetchListSliderByPaginate,
  fetchListSliderTrashedByPaginate,
  trashSlider,
  massTrashSlider,
  restoreSlider,
  massRestoreSlider,
  destroySlider,
  massDestroySlider,
  emptyTrashSlider
} from '@/api/slider';

export default {

  addSlider({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      addSlider(headers, formData)
      .then(res => {
        dispatch('slider/fetchListSliderByPaginate', { limit: 10, page: 1 }, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateSlider({ dispatch }, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateSlider(headers, formData, id)
      .then(res => {
        dispatch('slider/fetchListSliderByPaginate', { limit: 10, page: 1 }, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchSliderItemById({}, id) {
    return  new Promise((resolve, reject) => {
      fetchSliderItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchListSliderByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListSliderByPaginate(query)
      .then(res => {
        commit('slider/SET_SLIDERS', res.data.sliders, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchListSliderTrashedByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListSliderTrashedByPaginate(query)
      .then(res => {
        commit('slider/SET_SLIDERS', res.data.sliders, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  trashSlider({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashSlider(id)
      .then(res => {
        commit('slider/REMOVE_SLIDER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massTrashSlider({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashSlider(ids)
      .then(res => {
        commit('slider/REMOVE_SLIDERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreSlider({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreSlider(id)
      .then(res => {
        commit('slider/REMOVE_SLIDER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massRestoreSlider({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreSlider(ids)
      .then(res => {
        commit('slider/REMOVE_SLIDERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroySlider({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroySlider(id)
      .then(res => {
        commit('slider/REMOVE_SLIDER', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  massDestroySlider({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroySlider(ids)
      .then(res => {
        commit('slider/REMOVE_SLIDERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  emptyTrashSlider() {
    return new Promise((resolve, reject) => {
      emptyTrashSlider()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
};