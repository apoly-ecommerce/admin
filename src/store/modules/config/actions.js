import {
  viewConfig,
  viewGeneralSetting,
  updateBasicConfig,
  toggleMaintenanceMode,
  toggleNotification,
  updateConfig
} from '@/api/config';

export default {

  viewConfig({ commit }) {
    return new Promise((resolve, reject) => {
      viewConfig()
      .then(res => {
        commit('config/SET_SETTING_CONFIG', res.data.config, { root: true });
        resolve(res.data);
      })
      .catch((err) => reject(err));
    });
  },

  viewGeneralSetting({ commit }) {
    return new Promise((resolve, reject) => {
      viewGeneralSetting()
      .then(res => {
        commit('config/SET_SHOP_GENERAL_SETTING', res.data.shop, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateBasicConfig({}, { formData, shop }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateBasicConfig(headers, formData, shop)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err));
    });
  },

  toggleMaintenanceMode({}, shop) {
    return new Promise((resolve, reject) => {
      toggleMaintenanceMode(shop)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  toggleNotification({}, node) {
    return new Promise((resolve, reject) => {
      toggleNotification(node)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updateConfig({}, { formData, config }) {
    return new Promise((resolve, reject) => {
      updateConfig(formData, config)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }

};