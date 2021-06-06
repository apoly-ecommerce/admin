import request from '@/utils/request';

export function addCategory(headers, data) {
  return request({
    url: 'api/admin/catalog/category/add',
    method: 'post',
    headers,
    data
  });
}

export function fetchListCategory() {
  return request({
    url: 'api/admin/catalog/category/list',
    method: 'get'
  });
}

export function fetchCategoryByPaginate(query) {
  return request({
    url: 'api/admin/catalog/category/list/paginate',
    method: 'get',
    params: query
  });
}

export function fetchListCategoryTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/category/list/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashCategory(id) {
  return request({
    url: `api/admin/catalog/category/trash/${id}`,
    method: 'delete'
  });
}

export function massTrashCategory(ids) {
  return request({
    url: 'api/admin/catalog/category/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function destroyCategory(id) {
  return request({
    url: `api/admin/catalog/category/destroy/${id}`,
    method: 'delete'
  });
}

export function massDestroyCategory(ids) {
  return request({
    url: 'api/admin/catalog/category/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function restoreCategory(id) {
  return request({
    url: `api/admin/catalog/category/restore/${id}`,
    method: 'patch',
  });
}

export function massRestoreCategory(ids) {
  return request({
    url: 'api/admin/catalog/category/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function fetchCategoryItemById(id) {
  return request({
    url: `api/admin/catalog/category/show/${id}`,
    method: 'get'
  });
}

export function updateCategory(headers, data, id) {
  console.log(headers, data, id);
  return request({
    url: `api/admin/catalog/category/update/${id}`,
    method: 'post',
    headers,
    params: { _method: 'put' },
    data
  });
}