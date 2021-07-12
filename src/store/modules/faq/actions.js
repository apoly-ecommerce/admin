import {
  // Faq Topic
  fetchFaqTopicItemById,
  fetListFaqTopic,
  storeFaqTopic,
  updateFaqTopic,
  destroyFaqTopic,
  // Faq
  setupFaq,
  fetchFaqItemById,
  fetchListFaqByPaginate,
  storeFaq,
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

  storeFaqTopic({}, formData) {
    return new Promise((resolve, reject) => {
      storeFaqTopic(formData)
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
  setupFaq() {
    return new Promise((resolve, reject) => {
      setupFaq()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  },

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
        commit('faq/SET_FAQS', res.data, { root: true});
        resolve(res.data);
      })
      .catch(err => reject(err));
    });
  },

  storeFaq({}, formData) {
    return new Promise((resolve, reject) => {
      storeFaq(formData)
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