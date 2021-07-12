import request from '@/utils/request';

export function setupCategorySubGroup() {
  return request({
    url: 'api/admin/catalog/categorySubGroup/setup',
    method: 'GET',
  });
}

export function storeCategorySubGroup(headers, data) {
  return request({
    url: 'api/admin/catalog/categorySubGroup',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListCategorySubGroup() {
  return request({
    url: 'api/admin/catalog/categorySubGroup',
    method: 'GET'
  });
}

export function fetchListCategorySubGroupByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListCategorySubGroupTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashCategorySubGroup(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/${id}/trash`,
    method: 'DELETE'
  });
}

export function massTrashCategorySubGroup(ids) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function destroyCategorySubGroup(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyCategorySubGroup(ids) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreCategorySubGroup(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/${id}/restore`,
    method: 'PATCH',
  });
}

export function massRestoreCategorySubGroup(ids) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function fetchCategorySubGroupItemById(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/${id}`,
    method: 'GET'
  });
}

export function updateCategorySubGroup(headers, data, id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}

export function emptyTrashCategorySubGroup() {
  return request({
    url: 'api/admin/catalog/categorySubGroup/emptyTrash',
    method: 'DELETE'
  });
}