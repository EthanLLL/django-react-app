import { observable, action } from 'mobx';
import axios from '../apis/axios';
import CommonStore from './CommonStore';

class UserStore {
  @observable username;
  @observable email;
  @observable currentUser;
  @observable user_count;
  @observable likes_count;

  @action fetchUserInfo() {
    axios.get('/users/user_info').then((res) => {
      if (res.data.success === 1) {
        this.setUserInfo(res.data.data)
        CommonStore.setLogin()
      }
    })
  }

  @action setUserInfo(user) {
    this.currentUser = 1
    this.username = user.username
    this.email = user.email
    this.user_count = user.user_count
    this.likes_count = user.likes_count
  }

  @action forgetUser() {
    this.currentUser = undefined
  }
}

export default new UserStore()