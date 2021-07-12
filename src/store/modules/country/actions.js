import { fetchCountries } from '@/api/country';

export default {
  fetchCountries({}) {
    return new Promise((resolve, reject) => {
      fetchCountries()
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
};