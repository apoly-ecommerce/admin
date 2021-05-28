import request from '@/utils/request';

export function addRole({headers, data}) {
  return request({
    url: 'api/admin/role/addRole',
    method: 'post',
    headers,
    data
  });
}

export function fetchListRole({headers, params}) {
  return request({
    url: 'api/admin/role/list',
    method: 'get',
    headers,
    params
  });
}

export function fetchListRoleTrashed({headers, params}) {
  return request({
    url: 'api/admin/role/listTrashed',
    method: 'get',
    headers,
    params
  });
}

export function trashRole({ headers, id }) {
  return request({
    url: 'api/admin/role/trash',
    method: 'delete',
    headers,
    params: { id }
  });
}

export function restoreRole({ headers, id }) {
  return request({
    url: 'api/admin/role/restore',
    method: 'patch',
    headers,
    params: { id }
  });
}

export function destroyRole({ headers, id }) {
  return request({
    url: 'api/admin/role/destroy',
    method: 'delete',
    headers,
    params: { id }
  });
}

export function massTrashRole({ headers, ids }) {
  return request({
    url: 'api/admin/role/massTrash',
    method: 'delete',
    headers,
    params: { ids }
  });
}

export function massDestroyRole({ headers, ids }) {
  return request({
    url: 'api/admin/role/massDestroy',
    method: 'delete',
    headers,
    params: { ids }
  });
}

export function massRestoreRole({ headers, ids }) {
  return request({
    url: 'api/admin/role/massRestore',
    method: 'patch',
    headers,
    params: { ids }
  });
}