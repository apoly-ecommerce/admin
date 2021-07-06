import request from '@/utils/request';

export function setupFormCustomer() {
  return request({
    url: 'api/admin/admin/customer/setup',
    method: 'GET'
  });
}

export function storeCustomer(headers, data) {
  return request({
    url: 'api/admin/admin/customer',
    method: 'POST',
    headers,
    data
  });
}

export function fetchCustomerItemById(id) {
  return request({
    url: `api/admin/admin/customer/${id}`,
    method: 'GET'
  });
}

export function fetchListCustomer() {
  return request({
    url: 'api/admin/admin/customer',
    method: 'GET'
  });
}

export function fetchListCustomerByPaginate(query) {
  return request({
    url: 'api/admin/admin/customer/paginate',
    method: 'GET',
    params: query
  });
};

export function fetchListCustomerTrashedByPaginate(query) {
  return request({
    url: 'api/admin/admin/customer/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashCustomer(id) {
  return request({
    url: `api/admin/admin/customer/${id}/trash`,
    method: 'DELETE'
  });
}

export function massTrashCustomer(ids) {
  return request({
    url: 'api/admin/admin/customer/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function destroyCustomer(id) {
  return request({
    url: `api/admin/admin/customer/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyCustomer(ids) {
  return request({
    url: 'api/admin/admin/customer/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreCustomer(id) {
  return request({
    url: `api/admin/admin/customer/${id}/restore`,
    method: 'PATCH',
  });
}

export function massRestoreCustomer(ids) {
  return request({
    url: 'api/admin/admin/customer/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function updateCustomer(headers, data, id) {
  return request({
    url: `api/admin/admin/customer/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}

export function updatePasswordCustomer(data, id) {
  return request({
    url: `api/admin/admin/customer/update/password/${id}`,
    method: 'POST',
    params: { _method: 'PUT' },
    data
  });
}

export function emptyTrashCustomer() {
  return request({
    url: 'api/admin/admin/customer/emptyTrash',
    method: 'DELETE'
  });
}