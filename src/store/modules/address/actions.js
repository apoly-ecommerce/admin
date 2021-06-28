import {
  addAddress,
  fetchAddressItemById,
  updateAddress,
  destroyAddress,
  fetchAddressesByAddressable
} from '@/api/address';

export default {

  addAddress({ commit }, formData) {
    return new Promise((resolve, reject) => {
      addAddress(formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  fetchAddressItemById({ commit }, id) {
    return new Promise((resolve, reject) => {
      fetchAddressItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updateAddress({ commit }, { formData, id }) {
    return new Promise((resolve, reject) => {
      updateAddress(formData, id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
    });
  },

  destroyAddress({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyAddress(id)
      .then((res) => resolve(res.data))
      .catch((err) => err)
    });
  },

  fetchAddressesByAddressable({ commit }, { addressable_type, addressable_id }) {
    return new Promise((resolve, reject) => {
      fetchAddressesByAddressable(addressable_type, addressable_id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
    });
  }

};