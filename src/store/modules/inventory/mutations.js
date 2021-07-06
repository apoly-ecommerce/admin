export default {

  SET_INVENTORIES: (state, inventories) => {
    state.listInventory = inventories;
  },

  REMOVE_INVENTORY: (state, id) => {
    state.listInventory = state.listInventory.filter(item => item.id !== id);
  },

  REMOVE_INVENTORIES: (state, ids) => {
    state.listInventory = state.listInventory.filter(item => !ids.includes(item.id));
  },
};