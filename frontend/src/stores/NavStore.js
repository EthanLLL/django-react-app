import { observable, action } from 'mobx';

class NavStore {
  @observable activeItem = {
    home: false,
    login: false,
    message: false
  }

  @action setHomeActive = () => {
    this.activeItem.home = true
    this.activeItem.login = false
    this.activeItem.message = false
  }

  @action setMessageActive = () => {
    this.activeItem.home = false
    this.activeItem.login = false
    this.activeItem.message = true
  }

  @action setLoginActive = () => {
    this.activeItem.home = false
    this.activeItem.login = true
    this.activeItem.message = false
  }
}

export default new NavStore();