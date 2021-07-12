import request from '@/utils/request';

export function fetchNotifications() {
  return request({
    url: 'api/admin/notifications',
    method: 'GET',
  });
}

export function fetchUnreadNotifications() {
  return request({
    url: 'api/admin/notification/unread',
    method: 'GET',
  });
}

export function markAllNotificationsAsRead() {
  return request({
    url: 'api/admin/notification/markAsRead',
    method: 'PATCH'
  })
}

export function destroyNotification(id) {
  return request({
    url: `api/admin/notification/${id}/destroy`,
    method: 'DELETE'
  });
}

export function destroyAllNotification() {
  return request({
    url: `api/admin/notification/destroyAll`,
    method: 'DELETE'
  });
}