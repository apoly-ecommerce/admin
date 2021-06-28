export default {

  SET_FAQ_TOPICS: (state, faqTopics) => {
    state.faqTopics = faqTopics;
  },

  SET_FAQS: (state, faqs) => {
    state.faqs = faqs;
  },

  REMOVE_FAQ_TOPIC: (state, id) => {
    state.faqTopics = state.faqTopics.filter(item => item.id !== id);
  },

  REMOVE_FAQ: (state, id) => {
    state.faqs = state.faqs.filter(item => item.id !== id);
  }

}