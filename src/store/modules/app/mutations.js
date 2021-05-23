export default {
  /**
   * @param {string} name
   */
  SET_ACTIVE_DROPDOWN_MENU: (state, name) => {
    state.dropDownMenuNameActive = name;
  },

  /**
   * @param {boolean} isLoading
   */
  SET_IS_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },

  SET_MODULES_APP: (state, modulesApp) => {
    state.modulesApp = modulesApp;
  }
};