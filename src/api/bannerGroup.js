import request from '@/utils/request';

export function fetchListBannerGroup() {
  return request({
    url: 'api/admin/appearance/bannerGroup',
    method: 'GET'
  });
}