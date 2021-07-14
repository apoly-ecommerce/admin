export default {
  getConvFriends(state) {
    return state.convFriends;
  },

  getTabChatSelected(state) {
    return state.tabChatSelected;
  },

  getStringContactSearch(state) {
    return state.strContactSearch;
  },

  getConvListSearch(state) {
    const { strContactSearch } = state;
    let result = state[state.tabChatSelected].filter(item => {
      return item.title.toLowerCase().includes(strContactSearch.toLowerCase());
    });
    return result;
  }
}