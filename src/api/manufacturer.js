import request from '@/utils/request';

export function addManufacturer(headers, data) {
  return request({
    url: 'api/admin/catalog/manufacturer/add',
    method: 'post',
    headers,
    data
  });
}

export function fetchListManufacturer() {
  return request({
    url: 'api/admin/catalog/manufacturer/list',
    method: 'get'
  });
}

export function fetchListManufacturerByPaginate(query) {
  return request({
    url: 'api/admin/catalog/manufacturer/list/paginate',
    method: 'get',
    params: query
  });
}

export function fetchListManufacturerTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/manufacturer/list/trashed/paginate',
    method: 'get',
    params: query
  });
}

export function trashManufacturer(id) {
  return request({
    url: `api/admin/catalog/manufacturer/trash/${id}`,
    method: 'delete'
  });
}

export function massTrashManufacturer(ids) {
  return request({
    url: 'api/admin/catalog/manufacturer/massTrash',
    method: 'delete',
    params: { ids }
  });
}

export function destroyManufacturer(id) {
  return request({
    url: `api/admin/catalog/manufacturer/destroy/${id}`,
    method: 'delete'
  });
}

export function massDestroyManufacturer(ids) {
  return request({
    url: 'api/admin/catalog/manufacturer/massDestroy',
    method: 'delete',
    params: { ids }
  });
}

export function restoreManufacturer(id) {
  return request({
    url: `api/admin/catalog/manufacturer/restore/${id}`,
    method: 'patch',
  });
}

export function massRestoreManufacturer(ids) {
  return request({
    url: 'api/admin/catalog/manufacturer/massRestore',
    method: 'patch',
    params: { ids }
  });
}

export function fetchManufacturerItemById(id) {
  return request({
    url: `api/admin/catalog/manufacturer/show/${id}`,
    method: 'get'
  });
}

export function updateManufacturer(headers, data, id) {
  console.log(headers, data, id);
  return request({
    url: `api/admin/catalog/manufacturer/update/${id}`,
    method: 'post',
    headers,
    params: { _method: 'put' },
    data
  });
}

export function emptyTrashManufacturer() {
  return request({
    url: 'api/admin/catalog/manufacturer/emptyTrash',
    method: 'delete'
  });
}