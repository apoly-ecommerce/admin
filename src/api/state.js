import request from '@/utils/request';

export function fetchListStateByCountryId(id) {
  return request({
    url: `api/setting/state/list/country/${id}`,
    method: 'get',
  });
}