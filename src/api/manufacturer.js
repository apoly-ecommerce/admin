import request from '@/utils/request';

export function setupFormManufacturer() {
  return request({
    url: 'api/admin/catalog/manufacturer/setup',
    method: 'GET'
  });
}

export function storeManufacturer(headers, data) {
  return request({
    url: 'api/admin/catalog/manufacturer',
    method: 'POST',
    headers,
    data
  });
}

export function fetchListManufacturer() {
  return request({
    url: 'api/admin/catalog/manufacturer',
    method: 'GET'
  });
}

export function fetchListManufacturerByPaginate(query) {
  return request({
    url: 'api/admin/catalog/manufacturer/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListManufacturerTrashedByPaginate(query) {
  return request({
    url: 'api/admin/catalog/manufacturer/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashManufacturer(id) {
  return request({
    url: `api/admin/catalog/manufacturer/${id}/trash`,
    method: 'DELETE'
  });
}

export function massTrashManufacturer(ids) {
  return request({
    url: 'api/admin/catalog/manufacturer/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function destroyManufacturer(id) {
  return request({
    url: `api/admin/catalog/manufacturer/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyManufacturer(ids) {
  return request({
    url: 'api/admin/catalog/manufacturer/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreManufacturer(id) {
  return request({
    url: `api/admin/catalog/manufacturer/${id}/restore`,
    method: 'PATCH',
  });
}

export function massRestoreManufacturer(ids) {
  return request({
    url: 'api/admin/catalog/manufacturer/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function fetchManufacturerItemById(id) {
  return request({
    url: `api/admin/catalog/manufacturer/${id}`,
    method: 'GET'
  });
}

export function updateManufacturer(headers, data, id) {
  console.log(headers, data, id);
  return request({
    url: `api/admin/catalog/manufacturer/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data
  });
}

export function emptyTrashManufacturer() {
  return request({
    url: 'api/admin/catalog/manufacturer/emptyTrash',
    method: 'DELETE'
  });
}