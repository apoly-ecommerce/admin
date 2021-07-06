import { recursiveSidebarMenu } from '@/helpers';

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


  SET_SIDEBAR_MAP: (state, { permissions, mapSidebarMenu }) => {
    // console.log(permissions);
    if (!state.mapSidebarMenu.length) {
      state.mapSidebarMenu = recursiveSidebarMenu(permissions, mapSidebarMenu);
    }
  },

  RESET_SIDEBAR_MENU: (state) => {
    state.mapSidebarMenu = [];
  }
};