// Api
import { fetchListModule } from '@/api/module';

export default {

  fetchListModule({ commit }) {
      return new Promise((resolve, reject) => {
        fetchListModule()
        .then(res => resolve(res.data))
        .catch(error => reject(error));
      });
    }
};