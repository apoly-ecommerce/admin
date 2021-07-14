import request from '@/utils/request';

export function fetchConvListFriends() {
  return request({
    url: 'api/admin/support/userMessage/friends',
    method: 'GET'
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