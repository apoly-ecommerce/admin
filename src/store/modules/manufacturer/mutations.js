export default {

  SET_MANUFACTURERS: (state, manufacturers) => {
    state.listManufacturer = manufacturers;
  },

  REMOVE_MANUFACTURER: (state, id) => {
    state.listManufacturer = state.listManufacturer.filter(item => item.id !== id);
  },

  REMOVE_MANUFACTURERS: (state, ids) => {
    state.listManufacturer = state.listManufacturer.filter(item => !ids.includes(item.id));
  },

  UPDATE_MANUFACTURER: (state, data) => {
    let { listManufacturer } = state;
    let index = listManufacturer.findIndex(item => item.id === data.id );
    if (index !== -1) {
      state.listManufacturer.splice(index, 1, data);
      console.log(state.listManufacturer);
    } return;
  }

};