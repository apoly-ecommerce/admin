import request from '@/utils/request';

export function storeCategoryGroup(headers, data) {
  return request({
    url: 'api/admin/catalog/categoryGroup',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListCategoryGroup() {
  return request({
    url: 'api/admin/catalog/categoryGroup',
    method: 'GET',
  });
}

export function fetchListCategoryGroupByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categoryGroup/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListCategoryGroupTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categoryGroup/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashCategoryGroup(id) {
  return request({
    url: `api/admin/catalog/categoryGroup/${id}/trash`,
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
    url: `api/admin/catalog/categoryGroup/${id}`,
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
    url: `api/admin/catalog/categoryGroup/${id}/restore`,
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
    url: `api/admin/catalog/categoryGroup/${id}`,
    method: 'GET'
  });
}

export function updateCategoryGroup(headers, data, id) {
  return request({
    url: `api/admin/catalog/categoryGroup/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}

export function emptyTrashCategoryGroup() {
  return request({
    url: 'api/admin/catalog/categoryGroup/emptyTrash',
    method: 'DELETE'
  });
}