export default {
  SET_SHOP_GENERAL_SETTING: (state, shopSetting) => {
    state.shopGeneralSetting = shopSetting;
  },

  SET_SETTING_CONFIG: (state, config) => {
    state.settingConfig = config;
  }
};