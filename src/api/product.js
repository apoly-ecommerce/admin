import request from '@/utils/request';

export function addProduct(headers, data) {
  return request({
    url: 'api/admin/catalog/product/add',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListProduct() {
  return request({
    url: 'api/admin/catalog/product/list',
    method: 'GET'
  });
}

export function fetchListProductByPaginate(query) {
  return request({
    url: 'api/admin/catalog/product/list/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListProductTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/product/list/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashProduct(id) {
  return request({
    url: `api/admin/catalog/product/trash/${id}`,
    method: 'DELETE'
  });
}

export function massTrashProduct(ids) {
  return request({
    url: 'api/admin/catalog/product/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function destroyProduct(id) {
  return request({
    url: `api/admin/catalog/product/destroy/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyProduct(ids) {
  return request({
    url: 'api/admin/catalog/product/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreProduct(id) {
  return request({
    url: `api/admin/catalog/product/restore/${id}`,
    method: 'PATCH',
  });
}

export function massRestoreProduct(ids) {
  return request({
    url: 'api/admin/catalog/product/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function fetchProductItemById(id) {
  return request({
    url: `api/admin/catalog/product/show/${id}`,
    method: 'GET'
  });
}

export function updateProduct(headers, data, id) {
  return request({
    url: `api/admin/catalog/product/update/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}

export function emptyTrashProduct() {
  return request({
    url: 'api/admin/catalog/product/emptyTrash',
    method: 'DELETE'
  });
}