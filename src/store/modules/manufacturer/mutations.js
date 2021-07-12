export default {

  SET_MANUFACTURERS: (state, data) => {
    state.manufacturers = data.manufacturers;
    state.total = data.total;
  },

  REMOVE_MANUFACTURER: (state, id) => {
    state.manufacturers = state.manufacturers.filter(item => item.id !== id);
  },

  REMOVE_MANUFACTURERS: (state, ids) => {
    state.manufacturers = state.manufacturers.filter(item => !ids.includes(item.id));
  },

};