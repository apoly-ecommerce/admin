import request from '@/utils/request';

export function getAllModules(headers) {
  return request({
    url: 'api/admin/module/getAll',
    method: 'get',
    headers
  });
}