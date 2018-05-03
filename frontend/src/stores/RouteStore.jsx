import { observable, action } from 'mobx';

class RouteStore {
  @observable history = null

  @action setHistory(history) {
    this.history = history
  }
}

export default new RouteStore()