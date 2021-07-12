export default {

  SET_SLIDERS: (state, data) => {
    state.sliders = data.sliders;
    state.total = data.total;
  },

  REMOVE_SLIDER: (state, id) => {
    state.sliders = state.sliders.filter(item => item.id !== id);
  },

  REMOVE_SLIDERS: (state, ids) => {
    state.sliders = state.sliders.filter(item => !ids.includes(item.id));
  },
};