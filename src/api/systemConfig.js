import request from '@/utils/request';

export function viewSystemConfig() {
  return request({
    url: 'api/admin/setting/system/config',
    method: 'GET'
  });
}

export function updateSystemConfig(data) {
  return request({
    url: 'api/admin/setting/system/updateConfig',
    method: 'POST',
    params: { _method: 'PUT' },
    data
  });
}

export function toggleSystemConfig(node) {
  return request({
    url: `api/admin/setting/system/config/${node}/toggle`,
    method: 'PATCH',
  });
}