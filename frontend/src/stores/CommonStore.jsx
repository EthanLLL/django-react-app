import { observable, action, reaction } from 'mobx';

class CommonStore {

  @observable appName = '罗震最帅'
  @observable token = window.localStorage.getItem('token')
  @observable appLoaded = false
  @observable header = {
    headers: {
      "Authorization": 'JWT ' + localStorage.getItem('token')
    }
  }

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

  @action setToken(token) {
    this.token = token
  }

  @action setAppLoaded() {
    this.appLoaded = true
  }

  @action setHeader() {
    if (this.token) {
      this.header = {
        headers: {
          "Authorization": 'JWT ' + this.token
        }
      }
    }
  }
}

export default new CommonStore()