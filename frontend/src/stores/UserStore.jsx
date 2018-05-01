import { observable, action } from 'mobx';
import axios from 'axios';

class UserStore {
  @observable username;
  @observable email;

  @action fatchUserInfo() {
    return
  }
}