import {
  addInventory,
  storeInventory
} from '@/api/inventory';

export default {

  /**
   * Fetch the resource for the creating a new Inventory
   *
   * @param {*} vuex
   * @param {*} productId
   * @returns Promise
   */
  addInventory({}, productId) {
    return new Promise((resolve, reject) => {
      addInventory(productId)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  /**
   * Store a newly created resource in storage.
   *
   * @param {*} vuex
   * @param {*} formData
   * @returns Promise
   */
  storeInventory({}, formData) {
    return new Promise((resolve, reject) => {
      storeInventory(formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }
}