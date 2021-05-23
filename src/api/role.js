import request from '@/utils/request';

export function addRole({data, headers}) {
  return request({
    url: 'api/admin/role/addRole',
    method: 'post',
    data,
    headers
  });
}