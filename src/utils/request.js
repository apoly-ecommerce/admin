import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { TOKEN_KEY } from '@/constants';
import { Message } from 'element-ui';

// Create an axios instance
const service = axios.create({
  baseURL: 'https://pacific-forest-81915.herokuapp.com/',
  headers: {
    'accept': 'application/json'
  },
  timeout: 5000 // request timeout.
});

service.interceptors.request.use(
  config => {
    if (store.getters['app/getToken']) {
      config.headers[TOKEN_KEY] = getToken(); // Set token if it exists.
    }
    return config;
  },

  error => {
    // Do something with request error
    // console.error(error); // For debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response;
    if (res.status !== 200) {
      Message({
        message: 'Request error !',
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res.data;
    }
  },
  error => {
    console.log(error);
    const eRes = error.response;
    Message({
      message: 'Request error !',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject({
      status: eRes.status,
      errors: eRes.data.data.errors
    });
  }
);

export default service;