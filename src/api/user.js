import request from '@/utils/request';

export function login(data) {
  return request({
    url: 'api/admin/auth/login',
    method: 'post',
    data
  });
}

export function logout(headers) {
  return request({
    url: 'api/admin/auth/logout',
    method: 'post',
    headers
  });
}

export function getInfo(headers) {
  return request({
    url: 'api/admin/user/info',
    method: 'get',
    headers
  });
}

export function getUserRole(headers) {
  return request({
    url: 'api/admin/role/getRoleByUser',
    method: 'get',
    headers
  });
}