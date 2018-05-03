import { observable, action } from 'mobx';
import axios from '../apis/axios';
import CommonStore from './CommonStore';

class UserStore {
  @observable username;
  @observable email;

  @action fatchUserInfo() {
    axios.get('/users/user_info').then((res) => {
      if (res.data.success === 1) {
        this.setUserInfo(res.data.data)
        CommonStore.setLogin()
      }
    })
  }

  @action setUserInfo(user) {
    this.username = user.username
    this.email = user.email
  }
}

export default new UserStore()