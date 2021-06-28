import request from '@/utils/request';

export function addRole(formData) {
  return request({
    url: 'api/admin/setting/role/add',
    method: 'POST',
    data: formData
  });
}

export function updateRole(data, id) {
  return request ({
    url: `api/admin/setting/role/update/${id}`,
    method: 'PUT',
    data
  });
}

export function fetchListRole() {
  return request({
    url: 'api/admin/setting/role/list',
    method: 'GET'
  });
}

export function fetchListRoleByPaginate(query) {
  return request({
    url: 'api/admin/setting/role/list/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListRoleTrashedByPaginate(query) {
  return request({
    url: 'api/admin/setting/role/list/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashRole(id) {
  return request({
    url: `api/admin/setting/role/trash/${id}`,
    method: 'DELETE',
  });
}

export function restoreRole(id) {
  return request({
    url: `api/admin/setting/role/restore/${id}`,
    method: 'PATCH',
  });
}

export function destroyRole(id) {
  return request({
    url: `api/admin/setting/role/destroy/${id}`,
    method: 'DELETE',
  });
}

export function massTrashRole(ids) {
  return request({
    url: 'api/admin/setting/role/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function massDestroyRole(ids) {
  return request({
    url: 'api/admin/setting/role/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function massRestoreRole(ids) {
  return request({
    url: 'api/admin/setting/role/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function fetchRoleById(id) {
  return request({
    url: `api/admin/setting/role/show/${id}`,
    method: 'GET',
  });
}

export function fetchRolePermissionsByUser() {
  return request({
    url: 'api/admin/setting/role/getRolePermissionsByUser',
    method: 'GET'
  });
}
