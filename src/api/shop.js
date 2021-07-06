import request from '@/utils/request';

export function setupFormShop() {
  return request({
    url: 'api/admin/vendor/shop/setup',
    method: 'GET',
  });
}

export function fetchShopItemById(id) {
  return request({
    url: `api/admin/vendor/shop/${id}`,
    method: 'GET',
  });
}

export function fetchListShopByPaginate(query) {
  return request({
    url: 'api/admin/vendor/shop/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListShopTrashedByPaginate(query) {
  return request({
    url: 'api/admin/vendor/shop/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function updateShop(headers, data, id) {
  return request({
    url: `api/admin/vendor/shop/${id}`,
    method: 'POST',
    headers,
    params: { _method: 'PUT' },
    data,
  });
}

export function trashShop(id) {
  return request({
    url: `api/admin/vendor/shop/${id}/trash`,
    method: 'DELETE'
  });
}

export function restoreShop(id) {
  return request({
    url: `api/admin/vendor/shop/${id}/restore`,
    method: 'PATCH'
  });
}

export function massTrashShop(ids) {
  return request({
    url: 'api/admin/vendor/shop/massTrash',
    method: 'DELETE',
    params: { ids }
  });
}

export function massRestoreShop(ids) {
  return request({
    url: 'api/admin/vendor/shop/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function destroyShop(id) {
  return request({
    url: `api/admin/vendor/shop/${id}`,
    method: 'DELETE'
  });
}

export function massDestroyShop(ids) {
  return request({
    url: 'api/admin/vendor/shop/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function emptyTrashShop() {
  return request({
    url: 'api/admin/vendor/shop/emptyTrash',
    method: 'DELETE'
  });
}