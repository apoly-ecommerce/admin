import {
  fetchConvListFriends,
  storeChatRoom,
  fetchChatRooms
} from '@/api/message'

export default {

  fetchConvListFriends({ commit }) {
    return new Promise((resolve, reject) => {
      fetchConvListFriends()
      .then(res => {
        commit('SET_CONV_LIST_FRIENDS', res.data.friends);
        resolve(res.data);
      })
      .catch(err => reject(err))
    });
  },

  fetchChatRooms({ commit }) {
    return new Promise((resolve, reject) => {
      fetchChatRooms()
      .then(res => {
          console.log(res.data.rooms);
        commit('SET_CONV_LIST_ROOMS', res.data.rooms);
        resolve(res.data);
      })
      .catch(err => reject(err));
    })
  },

  storeChatRoom({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-type': 'multipart/form-data'
      };
      storeChatRoom(headers, formData)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  changeTabActive({ commit }, tab) {
    commit('SET_TAB_CHAT', tab);
  },

  handleContactSearch({ commit }, dataSearch) {
    commit('SET_STRING_CONTACT_SEARCH' ,dataSearch);
  }
}