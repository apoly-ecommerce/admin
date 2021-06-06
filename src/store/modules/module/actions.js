// Api
import { getAllModules } from '@/api/module';

export default {

    getAllModules({ commit }) {
      return new Promise((resolve, reject) => {
        getAllModules().then(res => {
          commit('module/SET_MODULES', res.data.modules, { root: true });
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    }
};