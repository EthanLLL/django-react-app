import axios from 'axios';
import NProgress from 'nprogress';
import { Notification } from 'element-react';
import RouteStore from '../stores/RouteStore';
import CommonStore from '../stores/CommonStore';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
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
  let type = 'error'
  let msg = ''

  if (error.response) {
    let status = error.response.status
    if (status === 403 || status === 401) {
      CommonStore.setLogout()
      RouteStore.history.replace('/login')
    }
    type = status >= 555 && status <= 1000 ? 'warning' : 'error'
    msg = `${status}: ${error.response.data.msg}`
  } else {
    type = 'error'
    msg = error.message === 'Network Error' ? '网络错误，请检查网络是否正常' : error.message
  }

  Notification({
    title: type === 'warning' ? '警告' : '错误',
    message: msg,
    duration: 2000,
    type: type
  });

  NProgress.done()
  
  return Promise.reject(error);
})

export default axios;