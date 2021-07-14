export default {
  SET_TAB_CHAT: (state, tab) => {
    state.tabChatSelected  = tab;
  },

  SET_STRING_CONTACT_SEARCH: (state, strSearch) => {
    state.strContactSearch = strSearch;
  },

  SET_CONV_LIST_FRIENDS: (state, convListFriends) => {
      console.log(convListFriends);
    state.convListFriends = convListFriends.map(friend => {
      return {
        avatar: friend.image,
        title: friend.name,
        role: friend.role ? friend.role.name : 'Super Admin',
        last_ib_at: friend.created_at,
        truncate: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, voluptas.'
      };
    });
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
  }
};