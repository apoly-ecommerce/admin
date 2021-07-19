export default {
  getMyFriends(state) {
    return state.myFriends;
  },

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
    const convList = state[state.tabChatSelected];
    if (convList.length) {
      let result = convList.filter(item => {
        return item.title.toLowerCase().includes(strContactSearch.toLowerCase());
      });
      return result;
    } return [];
  }

}