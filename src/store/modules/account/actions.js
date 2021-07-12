import {
  profile,
  updateAvatar,
  deleteAvatar,
  updateProfile,
  updatePassword
} from '@/api/account';

export default {

  profile() {
    return new Promise((resolve, reject) => {
      profile()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    })
  },

  updateAvatar({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateAvatar(headers, formData)
      .then(res => {
        dispatch('auth/fetchUserAuth', {}, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  deleteAvatar({ dispatch }) {
    return new Promise((resolve, reject) => {
      deleteAvatar()
      .then(res => {
        dispatch('auth/fetchUserAuth', {}, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateProfile({ dispatch }, formData) {
    return new Promise((resolve, reject) => {
      updateProfile(formData)
      .then(res => {
        dispatch('auth/fetchUserAuth', {}, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updatePassword({}, formData) {
    return new Promise((resolve, reject) => {
      updatePassword(formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

};