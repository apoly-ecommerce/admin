import {
  fetchListBannerGroup
} from '@/api/bannerGroup';

export default {

  fetchListBannerGroup() {
    return new Promise((resolve, reject) => {
      fetchListBannerGroup()
      .then(res => resolve(res.data))
      .catch(err => reject(err));
    });
  }

};