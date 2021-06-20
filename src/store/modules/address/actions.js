import {
  updateAddress
} from '@/api/address';

export default {

  updateAddress({ commit }, { formData, id }) {
    return new Promise((resolve, reject) => {
      updateAddress(formData, id)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
    });
  },

};