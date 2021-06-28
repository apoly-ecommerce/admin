import request from '@/utils/request';

export function login(data) {
  return request({
    url: 'api/admin/auth/login',
    method: 'POST',
    data
  });
}

export function logout() {
  return request({
    url: 'api/admin/auth/logout',
    method: 'POST',
  });
}


export function fetchUserAuth() {
  return request({
    url: 'api/admin/admin/user/auth',
    method: 'GET',
  });
}