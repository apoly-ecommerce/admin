import request from '@/utils/request';

export function addInventory(productId) {
  return request({
    url: `api/admin/stock/inventory/add/${productId}`,
    method: 'GET'
  });
}

export function storeInventory(data) {
  return request({
    url: 'api/admin/stock/inventory',
    method: 'POST',
    data
  });
}