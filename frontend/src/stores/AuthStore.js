import { observable, action } from 'mobx';
import axios from '../apis/axios';
import CommonStore from './CommonStore';
import RouteStore from './RouteStore';

class AuthStore {
  @observable inProgress = false
  @observable errors = undefined

  @observable values = {
    username: '',
    email: '',
    password: '',
    passwordTwo: ''
  }

  @action setUsername = (username) => {
    this.values.username = username
    console.log(this.values)
  }

  @action setEmail = (email) => {
    this.values.email = email
  }

  @action setPassword = (password) => {
    this.values.password = password
  }

  @action setPasswordTwo = (password) => {
    this.values.passwordTwo = password
  }

  @action reset() {
    this.values.username = ''
    this.values.email = ''
    this.values.password = ''
    this.values.passwordTwo = ''
  }

  @action login = () => {
    let username_or_email = ''
    if (this.values.username === '' && this.values.email !== '') {
      username_or_email = this.values.email
    } else {
      username_or_email = this.values.username
    }
    const payload = {
      'username_or_email': username_or_email,
      'password': this.values.password
    }
    axios.post('/auth/token/', payload)
      .then((res) => {
        const token = res.data.token
        localStorage.removeItem('token')
        localStorage.setItem('token', token)
        CommonStore.setToken(token)
        CommonStore.setLogin()
        
        RouteStore.history.replace('/')
      })
  }

  @action register = () => {
    const payload = this.values
    axios.defaults.headers.common['Authorization'] = null
    axios.post('/users/register/', payload)
      .then((res) => {
        this.login()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  @action logout = () => {
    localStorage.removeItem('token')
    CommonStore.setLogout()
  }
}

export default new AuthStore()