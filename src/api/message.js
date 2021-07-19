import request from '@/utils/request';

export function fetchMyFriends(query) {
  return request({
    url: 'api/admin/admin/user/friends',
    method: 'GET',
    params: query
  });
}

export function storeChatRoom(headers, data) {
  return request({
    url: 'api/admin/support/chatRoom',
    method: 'POST',
    headers,
    data
  });
}

export function fetchChatRooms() {
  return request({
    url: 'api/admin/support/chatRoom',
    method: 'GET',
  });
}