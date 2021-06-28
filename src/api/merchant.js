import request from '@/utils/request';

export function addMerchant(headers, data) {
  return request({
    url: 'api/admin/vendor/merchant',
    method: 'POST',
    headers,
    data
  });
}

export function updateMerchant(headers, data, id) {
  return request({
    url: `api/admin/vendor/merchant/${id}`,
    method: 'POST',
    params: { _method: 'PUT'},
    headers,
    data
  });
}

export function updatePasswordMerchant(data, id) {
  return request({
    url: `api/admin/vendor/merchant/update/password/${id}`,
    method: 'POST',
    params: { _method: 'PUT' },
    data
  });
}

export function fetchMerchantItemById(id) {
  return request({
    url: `api/admin/vendor/merchant/${id}`,
    method: 'GET'
  });
}

export function fetchListMerchantByPaginate(query) {
  return request({
    url: 'api/admin/vendor/merchant/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListMerchantTrashedByPaginate(query) {
  return request({
    url:  'api/admin/vendor/merchant/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashMerchant(id) {
  return request({
    url: `api/admin/vendor/merchant/${id}/trash`,
    method: 'DELETE'
  });
}

export function massTrashMerchant(ids) {
  return request({
    url: `api/admin/vendor/merchant/massTrash`,
    method: 'DELETE',
    params: { ids }
  });
  }

export function restoreMerchant(id) {
  return request({
    url: `api/admin/vendor/merchant/${id}/restore`,
    method: 'PATCH',
  });
}

export function massRestoreMerchant(ids) {
  return request({
    url: 'api/admin/vendor/merchant/massRestore',
    method: 'PATCH',
    params: { ids }
  });
  }

export function destroyMerchant(id) {
  return request({
    url: `api/admin/vendor/merchant/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyMerchant(ids) {
  return request({
    url: 'api/admin/vendor/merchant/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function emptyTrashMerchant() {
  return request({
    url: 'api/admin/vendor/merchant/emptyTrash',
    method: 'DELETE'
  });
}