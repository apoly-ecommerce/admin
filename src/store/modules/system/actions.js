import {
  fetchDataSystemGeneral,
  updateBasicSystem,
  toggleMaintenanceMode
} from '@/api/system'

export default {

  fetchDataSystemGeneral({ commit }) {
    return new Promise((resolve, reject) => {
      fetchDataSystemGeneral()
      .then(res => {
        commit('system/SET_BASIC_SYSTEM_CONFIG', res.data.system, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateBasicSystem({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateBasicSystem(headers, formData)
      .then(res => {
        dispatch('fetchDataSystemGeneral');
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  toggleMaintenanceMode() {
    return new Promise((resolve, reject) => {
      toggleMaintenanceMode()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    })
  }

}