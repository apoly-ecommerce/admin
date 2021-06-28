import request from '@/utils/request';

export function fetchDataSystemGeneral() {
  return request({
    url: 'api/admin/setting/system/general',
    method: 'GET'
  });
}

export function updateBasicSystem(headers, data) {
  return request({
    url: 'api/admin/setting/system/updateBasicSystem',
    method: 'POST',
    params: { _method: 'PUT' },
    headers,
    data
  });
}

export function toggleMaintenanceMode() {
  return request({
    url: 'api/admin/setting/system/maintenanceMode/toggle',
    method: 'PATCH'
  });
}