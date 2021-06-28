import request from '@/utils/request';

export function fetchListThemeOptions() {
  return request({
    url: 'api/admin/appearance/theme/option',
    method: 'GET'
  });
}

// FeatureBrands
export function editFeaturedBrands() {
  return request({
    url: 'api/admin/appearance/theme/featuredBrands',
    method: 'GET'
  });
}

export function updateFeaturedBrands(data) {
  return request({
    url: 'api/admin/appearance/theme/update/featuredBrands',
    method: 'POST',
    params: { _method: 'PUT'},
    data
  });
}

// Trending Now Categories
export function editTrendingNowCategories() {
  return request({
    url: 'api/admin/appearance/theme/trendingNowCategories',
    method: 'GET'
  });
}

export function updateTrendingNowCategories(data) {
  return request({
    url: 'api/admin/appearance/theme/update/trendingNowCategories',
    method: 'POST',
    params: { _method: 'PUT'},
    data
  });
}