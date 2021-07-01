import request from '@/utils/request';

export function storeSlider(headers, data) {
  return request({
    url: 'api/admin/appearance/slider',
    method: 'POST',
    headers,
    data
  });
}

export function updateSlider(headers, data, id) {
  return request({
    url: `api/admin/appearance/slider/${id}`,
    method: 'POST',
    params: { _method: 'PUT'},
    headers,
    data
  });
}

export function fetchSliderItemById(id) {
  return request({
    url: `api/admin/appearance/slider/${id}`,
    method: 'GET'
  });
}

export function fetchListSliderByPaginate(query) {
  return request({
    url: 'api/admin/appearance/slider/paginate',
    method: 'GET',
    params: query
  });
}

export function fetchListSliderTrashedByPaginate(query) {
  return request({
    url:  'api/admin/appearance/slider/trashed/paginate',
    method: 'GET',
    params: query
  });
}

export function trashSlider(id) {
  return request({
    url: `api/admin/appearance/slider/${id}/trash`,
    method: 'DELETE'
  });
}

//
export function massTrashSlider(ids) {
  return request({
    url: `api/admin/appearance/slider/massTrash`,
    method: 'DELETE',
    params: { ids }
  });
}

export function restoreSlider(id) {
return request({
  url: `api/admin/appearance/slider/${id}/restore`,
  method: 'PATCH',
});
}

export function massRestoreSlider(ids) {
  return request({
    url: 'api/admin/appearance/slider/massRestore',
    method: 'PATCH',
    params: { ids }
  });
}

export function destroySlider(id) {
  return request({
    url: `api/admin/appearance/slider/${id}`,
    method: 'DELETE'
  });
}


export function massDestroySlider(ids) {
  return request({
    url: 'api/admin/appearance/slider/massDestroy',
    method: 'DELETE',
    params: { ids }
  });
}

export function emptyTrashSlider() {
  return request({
    url: 'api/admin/appearance/slider/emptyTrash',
    method: 'DELETE'
  });
}