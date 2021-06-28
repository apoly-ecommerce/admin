import request from '@/utils/request';

export function addCategoryGroup(headers, data) {
  return request({
    url: 'api/admin/catalog/categoryGroup/add',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListCategoryGroup() {
  return request({
    url: 'api/admin/catalog/categoryGroup/list',
    method: 'GET',
  });
}

export function fetchListCategoryGroupByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categoryGroup/list/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListCategoryGroupTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categoryGroup/list/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashCategoryGroup(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/trash/${id}`,
    method: 'DELETE'
  });
}

export function massTrashCategoryGroup(ids) {
  return request({
    url: 'api/admin/catalog/categoryGroup/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function destroyCategoryGroup(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/destroy/${id}`,
    method: 'DELETE',
  });
}

export function massDestroyCategoryGroup(ids) {
  return request({
    url: 'api/admin/catalog/categoryGroup/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreCategoryGroup(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/restore/${id}`,
    method: 'PATCH'
  });
}

export function massRestoreCategoryGroup(ids) {
  return request({
    url: 'api/admin/catalog/categoryGroup/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function fetchCategoryGroupItemById(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/show/${id}`,
    method: 'GET'
  });
}

export function updateCategoryGroup(headers, data, id) {
  return request({
    url: `api/admin/catalog/categoryGroup/update/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}