import request from '@/utils/request';

export function getStateByCountryId(countryId) {
  return request({
    url: 'api/location/statesByCountryId',
    method: 'get',
    params: { countryId }
  });
}