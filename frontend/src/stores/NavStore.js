import { observable, action } from 'mobx';

class NavStore {
  @observable activeItem = {
    home: false,
    login: false,
    message: false,
    canva: false
  }

  @action setHomeActive = () => {
    this.activeItem.home = true
    this.activeItem.login = false
    this.activeItem.message = false
    this.activeItem.canva = false
  }

  @action setMessageActive = () => {
    this.activeItem.home = false
    this.activeItem.login = false
    this.activeItem.message = true
    this.activeItem.canva = false
  }

  @action setLoginActive = () => {
    this.activeItem.home = false
    this.activeItem.login = true
    this.activeItem.message = false
    this.activeItem.canva = false
  }

  @action setCanvaActive = () => {
    this.activeItem.home = false
    this.activeItem.login = false
    this.activeItem.message = false
    this.activeItem.canva = true
  }
}

export default new NavStore();