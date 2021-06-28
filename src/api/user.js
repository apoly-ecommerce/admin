import request from '@/utils/request';

export function addUser(headers, data) {
  return request({
    url: 'api/admin/admin/user/add',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListUser() {
  return request({
    url: 'api/admin/admin/user/list',
    method: 'GET'
  });
}

export function fetchListUserByPaginate(query) {
  return request({
    url: 'api/admin/admin/user/list/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListUserTrashedByPaginate(query) {
  return request({
    url: 'api/admin/admin/user/list/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashUser(id) {
  return request({
    url: `api/admin/admin/user/trash/${id}`,
    method: 'DELETE'
  });
}

export function massTrashUser(ids) {
  return request({
    url: 'api/admin/admin/user/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function destroyUser(id) {
  return request({
    url: `api/admin/admin/user/destroy/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyUser(ids) {
  return request({
    url: 'api/admin/admin/user/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreUser(id) {
  return request({
    url: `api/admin/admin/user/restore/${id}`,
    method: 'PATCH',
  });
}

export function massRestoreUser(ids) {
  return request({
    url: 'api/admin/admin/user/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function fetchUserItemById(id) {
  return request({
    url: `api/admin/admin/user/show/${id}`,
    method: 'GET'
  });
}

export function updateUser(headers, data, id) {
  return request({
    url: `api/admin/admin/user/update/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}

export function updatePasswordUser(data, id) {
  return request({
    url: `api/admin/admin/user/update/password/${id}`,
    method: 'POST',
    params: { _method: 'PUT' },
    data
  });
}

export function emptyTrashUser() {
  return request({
    url: 'api/admin/admin/user/emptyTrash',
    method: 'DELETE'
  });
}