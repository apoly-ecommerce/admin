import request from '@/utils/request';

export function fetchCountries() {
  return request({
    url: 'api/admin/setting/country/list',
    method: 'GET'
  });
}