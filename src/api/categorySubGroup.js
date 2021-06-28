import request from '@/utils/request';

export function addCategorySubGroup(headers, data) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/add',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListCategorySubGroup() {
  return request({
    url: 'api/admin/catalog/categorySubGroup/list',
    method: 'GET'
  });
}

export function fetchListCategorySubGroupByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/list/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListCategorySubGroupTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/list/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashCategorySubGroup(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/trash/${id}`,
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
    url: `api/admin/catalog/categorySubGroup/destroy/${id}`,
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
    url: `api/admin/catalog/categorySubGroup/restore/${id}`,
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
    url: `api/admin/catalog/categorySubGroup/show/${id}`,
    method: 'GET'
  });
}

export function updateCategorySubGroup(headers, data, id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/update/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}