import request from '@/utils/request';

export function login(data) {
  return request({
    url: 'api/admin/auth/login',
    method: 'post',
    data
  });
}

export function logout() {
  return request({
    url: 'api/admin/auth/logout',
    method: 'post',
  });
}


export function fetchUserAuth() {
  return request({
    url: 'api/admin/admin/user/auth',
    method: 'get',
  });
}