import request from '@/utils/request';

export function addCategoryGroup(headers, data) {
  return request({
    url: 'api/admin/catalog/categoryGroup/add',
    method: 'post',
    headers,
    data
  });
}

export function fetchListCategoryGroup() {
  return request({
    url: 'api/admin/catalog/categoryGroup/list',
    method: 'get',
  });
}

export function fetchListCategoryGroupByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categoryGroup/list/paginate',
    method: 'get',
    params: query
  });
}

export function fetchListCategoryGroupTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categoryGroup/list/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashCategoryGroup(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/trash/${id}`,
    method: 'delete'
  });
}

export function massTrashCategoryGroup(ids) {
  return request({
    url: 'api/admin/catalog/categoryGroup/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function destroyCategoryGroup(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/destroy/${id}`,
    method: 'delete',
  });
}

export function massDestroyCategoryGroup(ids) {
  return request({
    url: 'api/admin/catalog/categoryGroup/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function restoreCategoryGroup(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/restore/${id}`,
    method: 'patch'
  });
}

export function massRestoreCategoryGroup(ids) {
  return request({
    url: 'api/admin/catalog/categoryGroup/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function fetchCategoryGroupItemById(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/show/${id}`,
    method: 'get'
  });
}

export function updateCategoryGroup(headers, data, id) {
  return request({
    url: `api/admin/catalog/categoryGroup/update/${id}`,
    method: 'post',
    headers,
    params: { _method: 'put' },
    data
  });
}