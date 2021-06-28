import {
  // Faq Topic
  fetchFaqTopicItemById,
  fetListFaqTopic,
  addFaqTopic,
  updateFaqTopic,
  destroyFaqTopic,
  // Faq
  fetchFaqItemById,
  fetchListFaqByPaginate,
  addFaq,
  updateFaq,
  destroyFaq,
} from '@/api/faq';

export default {

  // FaqTopic
  fetchFaqTopicItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchFaqTopicItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    })
  },

  fetListFaqTopic({ commit }) {
    return new Promise((resolve, reject) => {
      fetListFaqTopic()
      .then(res => {
        commit('faq/SET_FAQ_TOPICS', res.data.faqTopics, { root: true});
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  addFaqTopic({}, formData) {
    return new Promise((resolve, reject) => {
      addFaqTopic(formData)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  updateFaqTopic({}, {formData, id}) {
    return new Promise((resolve, reject) => {
      updateFaqTopic(formData, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  destroyFaqTopic({ commit }, id) {
    return new Promise((resolve, reject) => {
        destroyFaqTopic(id)
      .then(res => {
        commit('faq/REMOVE_FAQ_TOPIC', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  // Faq
  fetchFaqItemById({}, id) {
    return new Promise((resolve, reject) => {
      fetchFaqItemById(id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    })
  },

  fetchListFaqByPaginate({ commit }, query) {
    return new Promise((resolve, reject) => {
      fetchListFaqByPaginate(query)
      .then(res => {
        commit('faq/SET_FAQS', res.data.faqs, { root: true});
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  addFaq({}, formData) {
    return new Promise((resolve, reject) => {
      addFaq(formData)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  updateFaq({}, {formData, id}) {
    return new Promise((resolve, reject) => {
      updateFaq(formData, id)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

  destroyFaq({ commit }, id) {
    return new Promise((resolve, reject) => {
        destroyFaq(id)
      .then(res => {
        commit('faq/REMOVE_FAQ', id, { root: true });
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },
}