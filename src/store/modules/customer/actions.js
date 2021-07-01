import {
  storeCustomer,
  fetchCustomerItemById,
  fetchListCustomer,
  fetchListCustomerByPaginate,
  fetchListCustomerTrashedByPaginate,
  trashCustomer,
  massTrashCustomer,
  destroyCustomer,
  massDestroyCustomer,
  restoreCustomer,
  massRestoreCustomer,
  updateCustomer,
  updatePasswordCustomer,
  emptyTrashCustomer
} from '@/api/customer';

export default {

  storeCustomer({}, formData) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      storeCustomer(headers, formData)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchCustomerItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchCustomerItemById(id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListCustomer({}, query) {
    return new Promise((resolve, reject) => {
      fetchListCustomer(query)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  fetchListCustomerByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListCustomerByPaginate(query)
      .then(res => {
        commit('customer/SET_CUSTOMERS', res.data.customers, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  fetchListCustomerTrashedByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListCustomerTrashedByPaginate(query)
      .then(res => {
        commit('customer/SET_CUSTOMERS', res.data.customers, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  trashCustomer({ commit }, id) {
    return new Promise((resolve, reject) => {
      trashCustomer(id)
      .then(res => {
        commit('customer/REMOVE_CUSTOMER', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massTrashCustomer({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massTrashCustomer(ids)
      .then(res => {
        commit('customer/REMOVE_CUSTOMERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  destroyCustomer({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyCustomer(id)
      .then(res => {
        commit('customer/REMOVE_CUSTOMER', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massDestroyCustomer({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massDestroyCustomer(ids)
      .then(res => {
        commit('customer/REMOVE_CUSTOMERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  restoreCustomer({ commit }, id) {
    return new Promise((resolve, reject) => {
      restoreCustomer(id)
      .then(res => {
        commit('customer/REMOVE_CUSTOMER', id, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  massRestoreCustomer({ commit }, ids) {
    return new Promise((resolve, reject) => {
      massRestoreCustomer(ids)
      .then(res => {
        commit('customer/REMOVE_CUSTOMERS', ids, { root: true });
        resolve(res.data);
      })
      .catch(error => reject(error));
    });
  },

  updateCustomer({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      updateCustomer(headers, formData, id)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  },

  updatePasswordCustomer({}, { formData, id }) {
    return new Promise((resolve, reject) => {
      updatePasswordCustomer(formData, id)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err));
    });
  },

  emptyTrashCustomer() {
    return new Promise((resolve, reject) => {
      emptyTrashCustomer()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }

};