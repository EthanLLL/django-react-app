import { observable, action, reaction } from 'mobx';
import axios from '../apis/axios';

class CommonStore {

  @observable appName = '罗震最帅'
  @observable token = window.localStorage.getItem('token')
  @observable appLoaded = false
  @observable isLogin = false

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('token', token)
        } else {
          window.localStorage.removeItem('token')
        }
      }
    )
  }

  @action setLogin() {
    this.isLogin = true
  }

  @action setLogout() {
    this.isLogin = false
  }

  @action setToken(token) {
    this.token = token
    axios.defaults.headers.common['Authorization'] = 'JWT ' + this.token
  }

  @action setAppLoaded() {
    this.appLoaded = true
  }
}

export default new CommonStore()