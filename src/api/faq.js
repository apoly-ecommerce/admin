import request from '@/utils/request';

// Faq Topic
export function fetchFaqTopicItemById(id) {
  return request({
    url: `api/admin/utility/faqTopic/${id}`,
    method: 'GET',
  });
}

export function fetListFaqTopic() {
  return request({
    url: 'api/admin/utility/faqTopic',
    method: 'GET',
  });
}

export function addFaqTopic(data) {
  return request({
    url: 'api/admin/utility/faqTopic',
    method: 'POST',
    data
  });
}

export function updateFaqTopic(data, id) {
  return request({
    url: `api/admin/utility/faqTopic/${id}`,
    method: 'POST',
    params: { _method: 'PUT'},
    data
  });
}

export function destroyFaqTopic(id) {
  return request({
    url: `api/admin/utility/faqTopic/${id}`,
    method: 'DELETE',
  });
}

// Faq
export function fetchFaqItemById(id) {
  return request({
    url: `api/admin/utility/faq/${id}`,
    method: 'GET',
  });
}

export function fetchListFaqByPaginate(query) {
  return request({
    url: 'api/admin/utility/faq/paginate',
    method: 'GET',
    params: query
  });
}

export function addFaq(data) {
  return request({
    url: 'api/admin/utility/faq',
    method: 'POST',
    data
  });
}

export function updateFaq(data, id) {
  return request({
    url: `api/admin/utility/faq/${id}`,
    method: 'POST',
    params: { _method: 'PUT'},
    data
  });
}

export function destroyFaq(id) {
  return request({
    url: `api/admin/utility/faq/${id}`,
    method: 'DELETE',
  });
}