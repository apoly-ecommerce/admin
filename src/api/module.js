import request from '@/utils/request';

export function fetchListModule() {
  return request({
    url: 'api/admin/setting/module/list'
  });
}