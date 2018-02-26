import { observable, action } from 'mobx';
import axios from 'axios';

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
    const payload = {
      'username': this.values.username,
      'email': this.values.email,
      'password': this.values.password
    }
    axios.post('/auth/token/', payload)
      .then((res) => {
        console.log('logging' + res.data.token)
        const token = res.data.token
        localStorage.removeItem('token')
        localStorage.setItem('token', token)
      })
  }

  @action register = () => {
    const payload = this.values
    axios.post('/users/register/', payload)
      .then((res) => {
        console.log('registered' + res.data)
        this.login()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new AuthStore()