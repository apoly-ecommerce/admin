import request from '@/utils/request';

export function addRole(formData) {
  return request({
    url: 'api/admin/setting/role/add',
    method: 'post',
    data: formData
  });
}

export function updateRole(data, id) {
  return request ({
    url: `api/admin/setting/role/update/${id}`,
    method: 'put',
    data
  });
}

export function fetchListRole() {
  return request({
    url: 'api/admin/setting/role/list',
    method: 'get'
  });
}

export function fetchListRoleByPaginate(query) {
  return request({
    url: 'api/admin/setting/role/list/paginate',
    method: 'get',
    params: query
  });
}

export function fetchListRoleTrashedByPaginate(query) {
  return request({
    url: 'api/admin/setting/role/list/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashRole(id) {
  return request({
    url: `api/admin/setting/role/trash/${id}`,
    method: 'delete',
  });
}

export function restoreRole(id) {
  return request({
    url: `api/admin/setting/role/restore/${id}`,
    method: 'patch',
  });
}

export function destroyRole(id) {
  return request({
    url: `api/admin/setting/role/destroy/${id}`,
    method: 'delete',
  });
}

export function massTrashRole(ids) {
  return request({
    url: 'api/admin/setting/role/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function massDestroyRole(ids) {
  return request({
    url: 'api/admin/setting/role/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function massRestoreRole(ids) {
  return request({
    url: 'api/admin/setting/role/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function fetchRoleById(id) {
  return request({
    url: `api/admin/setting/role/show/${id}`,
    method: 'get',
  });
}

export function fetchRolePermissionsByUser() {
  return request({
    url: 'api/admin/setting/role/getRolePermissionsByUser',
    method: 'get'
  });
}
