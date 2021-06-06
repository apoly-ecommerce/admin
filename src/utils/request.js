import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { MessageBox, Message } from 'element-ui';

// Create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:2810/',
  timeout: 5000 // request timeout.
});

service.interceptors.request.use(
  config => {
    if (store.getters['user/getToken']) {
      config.headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      };
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => { return response.data; },
  error => {
    if (error.response.status === 403) {
      MessageBox.confirm('Quyền truy cập vào tài nguyên được yêu cầu bị cấm, vui lòng liên hệ thành viên của thẩm quyền ban hành nhiệm vụ', 'Xác nhận', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        Message({
          message: 'Vui lòng rời khỏi tab nhiệm vụ này !',
          type: 'warning',
          duration: 5 * 1000
        });
    })}
    if (error.response.status === 401) {
      MessageBox.confirm('Bạn đã đăng xuất, bạn có thể hủy để ở lại trang này hoặc đăng nhập lại', 'Xác nhận đăng xuất', {
        confirmButtonText: 'Đăng nhập lại',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        });
      });
    }
    return Promise.reject(error.response);
  }
);

export default service;