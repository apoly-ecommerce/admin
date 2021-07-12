import {
  viewSystemConfig,
  updateSystemConfig,
  toggleSystemConfig
} from '@/api/systemConfig';

export default {
  viewSystemConfig({ commit }) {
    return new Promise((resolve, reject) => {
      viewSystemConfig()
      .then(res => {
        commit('SET_SYSTEM_CONFIG', res.data.system);
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateSystemConfig({}, formData) {
    return new Promise((resolve, reject) => {
      updateSystemConfig(formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  toggleSystemConfig({}, node) {
    return new Promise((resolve, reject) => {
      toggleSystemConfig(node)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }
};