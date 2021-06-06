import request from '@/utils/request';

export function addProduct(headers, data) {
  return request({
    url: 'api/admin/catalog/product/add',
    method: 'post',
    headers,
    data
  });
}

export function fetchListProduct() {
  return request({
    url: 'api/admin/catalog/product/list',
    method: 'get'
  });
}

export function fetchListProductByPaginate(query) {
  return request({
    url: 'api/admin/catalog/product/list/paginate',
    method: 'get',
    params: query
  });
}

export function fetchListProductTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/product/list/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashProduct(id) {
  return request({
    url: `api/admin/catalog/product/trash/${id}`,
    method: 'delete'
  });
}

export function massTrashProduct(ids) {
  return request({
    url: 'api/admin/catalog/product/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function destroyProduct(id) {
  return request({
    url: `api/admin/catalog/product/destroy/${id}`,
    method: 'delete'
  });
}

export function massDestroyProduct(ids) {
  return request({
    url: 'api/admin/catalog/product/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function restoreProduct(id) {
  return request({
    url: `api/admin/catalog/product/restore/${id}`,
    method: 'patch',
  });
}

export function massRestoreProduct(ids) {
  return request({
    url: 'api/admin/catalog/product/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function fetchProductItemById(id) {
  return request({
    url: `api/admin/catalog/product/show/${id}`,
    method: 'get'
  });
}

export function updateProduct(headers, data, id) {
  return request({
    url: `api/admin/catalog/product/update/${id}`,
    method: 'post',
    headers,
    params: { _method: 'put' },
    data
  });
}

export function emptyTrashProduct() {
  return request({
    url: 'api/admin/catalog/product/emptyTrash',
    method: 'delete'
  });
}