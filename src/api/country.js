import request from '@/utils/request';

export function fetchListCountries() {
  return request({
    url: 'api/admin/setting/country/list',
    method: 'GET'
  });
}