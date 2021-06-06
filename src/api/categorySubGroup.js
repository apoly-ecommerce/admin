import request from '@/utils/request';

export function addCategorySubGroup(headers, data) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/add',
    method: 'post',
    headers,
    data
  });
}

export function fetchListCategorySubGroup() {
  return request({
    url: 'api/admin/catalog/categorySubGroup/list',
    method: 'get'
  });
}

export function fetchListCategorySubGroupByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/list/paginate',
    method: 'get',
    params: query
  });
}

export function fetchListCategorySubGroupTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/list/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashCategorySubGroup(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/trash/${id}`,
    method: 'delete'
  });
}

export function massTrashCategorySubGroup(ids) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function destroyCategorySubGroup(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/destroy/${id}`,
    method: 'delete'
  });
}

export function massDestroyCategorySubGroup(ids) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function restoreCategorySubGroup(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/restore/${id}`,
    method: 'patch',
  });
}

export function massRestoreCategorySubGroup(ids) {
  return request({
    url: 'api/admin/catalog/categorySubGroup/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function fetchListCategorySubGroupItemById(id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/show/${id}`,
    method: 'get'
  });
}

export function updateCategorySubGroup(headers, data, id) {
  return request({
    url: `api/admin/catalog/categorySubGroup/update/${id}`,
    method: 'post',
    headers,
    params: { _method: 'put' },
    data
  });
}