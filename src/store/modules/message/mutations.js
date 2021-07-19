export default {
  SET_TAB_CHAT: (state, tab) => {
    state.tabChatSelected  = tab;
  },

  SET_STRING_CONTACT_SEARCH: (state, strSearch) => {
    state.strContactSearch = strSearch;
  },

  ADD_FRIENDS: (state, friends) => {
     const newFriends = friends.map(friend => {
      return {
        avatar: friend.image,
        title: friend.name,
      };
    });
    state.myFriends.push(...newFriends);
  },

  SET_CONV_LIST_ROOMS: (state, convListRooms) => {
    state.convListRooms = convListRooms.map(room => {
      return {
        avatar: room.image,
        title: room.name,
        last_ib_at: room.created_at,
        truncate: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, voluptas.'
      };
    });
  },

  UNSHIFT_CONV_ITEM_INTO_ROOMS: (state, convRoom) => {
    if (convRoom) {
      state.convListRooms.unshift(convRoom);
    }
  }
};