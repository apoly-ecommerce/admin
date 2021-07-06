import request from '@/utils/request';

export function viewConfig() {
  return request({
    url: 'api/admin/setting/config',
    method: 'GET',
  });
}

export function viewGeneralSetting() {
  return request({
    url: 'api/admin/setting/config/general',
    method: 'GET'
  });
}

export function updateBasicConfig(headers, data, shop) {
  return request({
    url: `api/admin/setting/config/updateBasicConfig/${shop}`,
    method: 'POST',
    params: { _method: 'PUT' },
    headers,
    data
  });
}

export function toggleMaintenanceMode (shop) {
  return request({
    url: `api/admin/setting/config/maintenanceMode/${shop}/toggle`,
    method: 'PATCH'
  });
}

export function toggleNotification(node) {
  return request({
    url: `api/admin/setting/config/notification/${node}/toggle`,
    method: 'PATCH'
  });
}

export function updateConfig(data, config) {
  return request({
    url: `api/admin/setting/config/updateConfig/${config}`,
    method: 'POST',
    params: { _method: 'PUT' },
    data
  });
}