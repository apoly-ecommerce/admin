export default {
  /**
   * @param {string} name
   */
  handleActiveDropdownMenu({ commit }, name) {
    commit('app/SET_ACTIVE_DROPDOWN_MENU', name, { root: true });
  },

  /**
   * @param {boolean} isLoading
   */
  handleSetIsLoading({ commit }, isLoading) {
    commit('app/SET_IS_LOADING', isLoading, { root: true });
  },

};