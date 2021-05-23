import request from '@/utils/request';

export function getAllCountries() {
  return request({
    url: 'api/location/countries',
    method: 'get'
  });
}