import request from '@/utils/request';

export function updateAddress(data, id) {
  return request({
    url: `api/address/${id}`,
    method: 'post',
    params: { _method: 'put' },
    data
  });
}