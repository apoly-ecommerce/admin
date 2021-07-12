import request from '@/utils/request';

export function profile() {
  return request({
    url: 'api/admin/account/profile',
    method: 'GET'
  });
}

export function updateAvatar(headers, data) {
  return request({
    url: 'api/admin/account/profile/updatePhoto',
    method: 'POST',
    params: { _method: 'PUT' },
    headers,
    data
  });
}

export function deleteAvatar() {
  return request({
    url: 'api/admin/account/profile/deletePhoto',
    method: 'DELETE',
  });
}

export function updateProfile(data) {
  return request({
    url: 'api/admin/account/profile/update',
    method: 'POST',
    params: { _method: 'PUT' },
    data
  });
}

export function updatePassword(data) {
  return request({
    url: 'api/admin/account/profile/updatePassword',
    method: 'PATCH',
    data
  });
}