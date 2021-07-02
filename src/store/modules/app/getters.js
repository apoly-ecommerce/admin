export default {

  getLogo(state) {
    return state.sidebar.isOpen ? state.logo.lg : state.logo.mini
  },

  getDropdownMenuNameActive(state) {
    return state.dropDownMenuNameActive;
  },

  getCopyright(state) {
    return state.copyright;
  },

  getVersion(state) {
    return state.version;
  },

  getIsLoading(state) {
    return state.isLoading;
  },

  getMapSidebarMenu(state) {
    return state.mapSidebarMenu;
  }

};