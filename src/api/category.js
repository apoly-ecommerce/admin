import request from '@/utils/request';

export function addCategory(headers, data) {
  return request({
    url: 'api/admin/catalog/category/add',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListCategory() {
  return request({
    url: 'api/admin/catalog/category/list',
    method: 'GET'
  });
}

export function fetchCategoryByPaginate(query) {
  return request({
    url: 'api/admin/catalog/category/list/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListCategoryTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/category/list/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashCategory(id) {
  return request({
    url: `api/admin/catalog/category/trash/${id}`,
    method: 'DELETE'
  });
}

export function massTrashCategory(ids) {
  return request({
    url: 'api/admin/catalog/category/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function destroyCategory(id) {
  return request({
    url: `api/admin/catalog/category/destroy/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyCategory(ids) {
  return request({
    url: 'api/admin/catalog/category/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreCategory(id) {
  return request({
    url: `api/admin/catalog/category/restore/${id}`,
    method: 'PATCH',
  });
}

export function massRestoreCategory(ids) {
  return request({
    url: 'api/admin/catalog/category/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function fetchCategoryItemById(id) {
  return request({
    url: `api/admin/catalog/category/show/${id}`,
    method: 'GET'
  });
}

export function updateCategory(headers, data, id) {
  return request({
    url: `api/admin/catalog/category/update/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}