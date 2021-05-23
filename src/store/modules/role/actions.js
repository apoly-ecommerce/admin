// Api
import { addRole } from '@/api/role';
// Utils
import { getToken } from '@/utils/auth';

export default {
  addRole({commit}, roleData) {
    return new Promise((resolve, reject) => {
      const config = {
        data: roleData,
        headers: 'Bearer ' + getToken()
      };
      addRole(config).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
    });
  }
};