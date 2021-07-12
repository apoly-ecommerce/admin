export default {

  SET_UNREAD_NOTIFICATIONS: (state, notifications) => {
    state.unreadNotifications = notifications;
  },

  SET_NOTIFICATIONS: (state, notifications) => {
    state.notifications = notifications;
  },

  REMOVE_NOTIFICATION: (state, id) => {
    state.notifications = state.notifications.filter(item => item.id !== id);
  },

};