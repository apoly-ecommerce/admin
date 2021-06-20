import request from '@/utils/request';

export function addCustomer(headers, data) {
  return request({
    url: 'api/admin/admin/customer',
    method: 'post',
    headers,
    data
  });
}

export function fetchCustomerItemById(id) {
  return request({
    url: `api/admin/admin/customer/${id}`,
    method: 'get'
  });
}

export function fetchListCustomer() {
  return request({
    url: 'api/admin/admin/customer',
    method: 'get'
  });
}

export function fetchListCustomerByPaginate(query) {
  return request({
    url: 'api/admin/admin/customer/paginate',
    method: 'get',
    params: query
  });
};

export function fetchListCustomerTrashedByPaginate(query) {
  return request({
    url: 'api/admin/admin/customer/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashCustomer(id) {
  return request({
    url: `api/admin/admin/customer/${id}/trash`,
    method: 'delete'
  });
}

export function massTrashCustomer(ids) {
  return request({
    url: 'api/admin/admin/customer/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function destroyCustomer(id) {
  return request({
    url: `api/admin/admin/customer/${id}/destroy`,
    method: 'delete'
  });
}

export function massDestroyCustomer(ids) {
  return request({
    url: 'api/admin/admin/customer/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function restoreCustomer(id) {
  return request({
    url: `api/admin/admin/customer/${id}/restore`,
    method: 'patch',
  });
}

export function massRestoreCustomer(ids) {
  return request({
    url: 'api/admin/admin/customer/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function updateCustomer(headers, data, id) {
  return request({
    url: `api/admin/admin/customer/${id}`,
    method: 'post',
    headers,
    params: { _method: 'put' },
    data
  });
}

export function emptyTrashCustomer() {
  return request({
    url: 'api/admin/admin/customer/emptyTrash',
    method: 'delete'
  });
}