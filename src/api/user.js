import request from '@/utils/request';

export function login(data) {
  return request({
    url: 'api/admin/auth/login',
    method: 'post',
    data
  });
}

export function logout() {
  return request({
    url: 'api/admin/auth/logout',
    method: 'post',
  });
}

export function getInfo() {
  return request({
    url: 'api/admin/admin/user/info',
    method: 'get',
  });
}


export function addUser(headers, data) {
  return request({
    url: 'api/admin/admin/user/add',
    method: 'post',
    headers,
    data
  });
}

export function fetchListUser() {
  return request({
    url: 'api/admin/admin/user/list',
    method: 'get'
  });
}

export function fetchListUserByPaginate(query) {
  return request({
    url: 'api/admin/admin/user/list/paginate',
    method: 'get',
    params: query
  });
}

export function fetchListUserTrashedByPaginate(query) {
  return request({
    url: 'api/admin/admin/user/list/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashUser(id) {
  return request({
    url: `api/admin/admin/user/trash/${id}`,
    method: 'delete'
  });
}

export function massTrashUser(ids) {
  return request({
    url: 'api/admin/admin/user/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function destroyUser(id) {
  return request({
    url: `api/admin/admin/user/destroy/${id}`,
    method: 'delete'
  });
}

export function massDestroyUser(ids) {
  return request({
    url: 'api/admin/admin/user/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function restoreUser(id) {
  return request({
    url: `api/admin/admin/user/restore/${id}`,
    method: 'patch',
  });
}

export function massRestoreUser(ids) {
  return request({
    url: 'api/admin/admin/user/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function fetchUserItemById(id) {
  return request({
    url: `api/admin/admin/user/show/${id}`,
    method: 'get'
  });
}

export function updateUser(headers, data, id) {
  return request({
    url: `api/admin/admin/user/update/${id}`,
    method: 'post',
    headers,
    params: { _method: 'put' },
    data
  });
}

export function updatePasswordUser(data, id) {
  return request({
    url: `api/admin/admin/user/update/password/${id}`,
    method: 'post',
    params: { _method: 'put' },
    data
  });
}

export function emptyTrashUser() {
  return request({
    url: 'api/admin/admin/user/emptyTrash',
    method: 'delete'
  });
}