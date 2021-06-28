export default {

  SET_SLIDERS: (state, sliders) => {
    state.listSlider = sliders;
  },

  REMOVE_SLIDER: (state, id) => {
    state.listSlider = state.listSlider.filter(item => item.id !== id);
  },

  REMOVE_SLIDERS: (state, ids) => {
    state.listSlider = state.listSlider.filter(item => !ids.includes(item.id));
  },
};