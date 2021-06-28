import request from '@/utils/request';

export function addBanner(headers, data) {
  return request({
    url: 'api/admin/appearance/banner',
    method: 'POST',
    headers,
    data
  });
}

export function updateBanner(headers, data, id) {
  return request({
    url: `api/admin/appearance/banner/${id}`,
    method: 'POST',
    params: { _method: 'PUT'},
    headers,
    data
  });
}

export function fetchBannerItemById(id) {
  return request({
    url: `api/admin/appearance/banner/${id}`,
    method: 'GET'
  });
}

export function fetchListBannerByPaginate(query) {
  return request({
    url: 'api/admin/appearance/banner/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListBannerTrashedByPaginate(query) {
  return request({
    url:  'api/admin/appearance/banner/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashBanner(id) {
  return request({
    url: `api/admin/appearance/banner/${id}/trash`,
    method: 'DELETE'
  });
}

//
export function massTrashBanner(ids) {
  return request({
    url: `api/admin/appearance/banner/massTrash`,
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreBanner(id) {
return request({
  url: `api/admin/appearance/banner/${id}/restore`,
  method: 'PATCH',
});
}

export function massRestoreBanner(ids) {
  return request({
    url: 'api/admin/appearance/banner/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function destroyBanner(id) {
  return request({
    url: `api/admin/appearance/banner/${id}`,
    method: 'DELETE'
  });
}


export function massDestroyBanner(ids) {
  return request({
    url: 'api/admin/appearance/banner/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function emptyTrashBanner() {
  return request({
    url: 'api/admin/appearance/banner/emptyTrash',
    method: 'DELETE'
  });
}