import axios from 'axios';
import NProgress from 'nprogress';
import { Notification } from 'element-react';
import RouteStore from '../stores/RouteStore';
import CommonStore from '../stores/CommonStore';

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.baseURL = 'https://www.luozhenzuishuai.com'
// axios.defaults.baseURL = 'http://127.0.0.1:8000';
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
  let type = 'error'
  let msg = ''

  if (error.response) {
    let status = error.response.status
    if (status === 403 || status === 401) {
      CommonStore.setLogout()
      RouteStore.history.replace('/login')
    }
    type = status >= 555 && status <= 1000 ? 'warning' : 'error'
    msg = `${status}: 未登录~`
  } else {
    type = 'error'
    msg = error.message === 'Network Error' ? '网络错误，请检查网络是否正常' : error.message
  }

  Notification({
    title: type === 'warning' ? 'warning' : 'error',
    message: msg,
    duration: 2000,
    type: type
  });

  NProgress.done()
  
  return Promise.reject(error);
})

export default axios;
