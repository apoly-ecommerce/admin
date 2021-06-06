import request from '@/utils/request';

export function getAllModules() {
  return request({
    url: 'api/admin/setting/module/list'
  });
}