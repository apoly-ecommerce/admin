export default {

  SET_INVENTORIES: (state, data) => {
    state.inventories = data.inventories;
    state.total = data.total;
  },

  REMOVE_INVENTORY: (state, id) => {
    state.inventories = state.inventories.filter(item => item.id !== id);
  },

  REMOVE_INVENTORIES: (state, ids) => {
    state.inventories = state.inventories.filter(item => !ids.includes(item.id));
  },
};