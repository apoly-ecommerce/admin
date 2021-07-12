import request from '@/utils/request';

export function setupFormAddress() {
  return request({
    url: 'api/address/setup',
    method: 'GET',
  });
}

export function storeAddress(data) {
  return request({
    url: 'api/address/',
    method: 'POST',
    data
  });
}

export function updateAddress(data, id) {
  return request({
    url: `api/address/${id}`,
    method: 'POST',
    params: { _method: 'PUT' },
    data
  });
}

export function destroyAddress(id) {
  return request({
    url: `api/address/${id}`,
    method: 'DELETE'
  });
}

export function fetchAddressItemById(id) {
  return request({
    url: `api/address/${id}`,
    method: 'GET'
  })
}

export function fetchAddressesByAddressable(addressable_type, addressable_id) {
  return request({
    url: `api/address/addresses/${addressable_type}/${addressable_id}`,
    method: 'GET'
  });
}