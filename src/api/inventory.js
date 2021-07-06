import request from '@/utils/request';

export function setupFormInventory() {
  return request({
    url: 'api/admin/stock/inventory/setup',
    method: 'GET',
  });
}

export function addInventory(productId) {
  return request({
    url: `api/admin/stock/inventory/add/${productId}`,
    method: 'GET'
  });
}

export function storeInventory(data) {
  return request({
    url: 'api/admin/stock/inventory',
    method: 'POST',
    data
  });
}

export function editInventory(id) {
  return request({
    url: `api/admin/stock/inventory/${id}/edit`,
    method: 'GET',
  });
}

export function updateInventory(data, id) {
  return request({
    url: `api/admin/stock/inventory/${id}`,
    method: 'POST',
    params: { _method: 'PUT'},
    data
  });
}


export function fetchInventoryItemById(id) {
  return request({
    url: `api/admin/stock/inventory/${id}`,
    method: 'GET'
  });
}

export function fetchListInventoryByPaginate(query) {
  return request({
    url: 'api/admin/stock/inventory/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListInventoryTrashedByPaginate(query) {
  return request({
    url:  'api/admin/stock/inventory/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashInventory(id) {
  return request({
    url: `api/admin/stock/inventory/${id}/trash`,
    method: 'DELETE'
  });
}

export function massTrashInventory(ids) {
  return request({
    url: `api/admin/stock/inventory/massTrash`,
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreInventory(id) {
  return request({
    url: `api/admin/stock/inventory/${id}/restore`,
    method: 'PATCH',
  });
}


export function massRestoreInventory(ids) {
  return request({
    url: 'api/admin/stock/inventory/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function destroyInventory(id) {
  return request({
    url: `api/admin/stock/inventory/${id}`,
    method: 'DELETE'
  });
}


export function massDestroyInventory(ids) {
  return request({
    url: 'api/admin/stock/inventory/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function emptyTrashInventory() {
  return request({
    url: 'api/admin/stock/inventory/emptyTrash',
    method: 'DELETE'
  });
}