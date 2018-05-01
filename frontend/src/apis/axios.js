import axios from 'axios';
import NProgress from 'nprogress';
import { Notification } from 'element-react';
import CommonStore from '../stores/CommonStore';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = 'JWT ' + CommonStore.token

axios.interceptors.request.use(function (config) {
  NProgress.start()
  return config;
}, function (error) {
  NProgress.done()
  return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {
  NProgress.done()
  return response
}, function (error) {
  NProgress.done()
  const status = error.response.status
  Notification.error({
    title: status + ' 错误',
    message: '有问题哦',
    duration: 2000
  });
  
  return Promise.reject(error);
  // return Promise.resolve(error.response)
})

export default axios;
