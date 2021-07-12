import {
  fetchNotifications,
  fetchUnreadNotifications,
  markAllNotificationsAsRead,
  destroyNotification,
  destroyAllNotification
} from '@/api/notification';

export default {

  fetchNotifications({ commit }) {
    return new Promise((resolve, reject) => {
      fetchNotifications()
      .then(res => {
        commit('SET_NOTIFICATIONS', res.data.notifications);
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  fetchUnreadNotifications({ commit }) {
    return new Promise((resolve, reject) => {
      fetchUnreadNotifications()
      .then(res => {
        commit('SET_UNREAD_NOTIFICATIONS', res.data.notifications);
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  markAllNotificationsAsRead({}) {
    return new Promise((resolve, reject) => {
      markAllNotificationsAsRead()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  destroyNotification({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyNotification(id)
      .then(res => {
        commit('REMOVE_NOTIFICATION', id);
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  destroyAllNotification({ commit }) {
    return new Promise((resolve, reject) => {
      destroyAllNotification()
      .then(res => {
        commit('SET_NOTIFICATIONS', []);
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

};