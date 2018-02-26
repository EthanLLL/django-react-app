import { observable, action } from 'mobx';
import axios from 'axios';
import CommonStore from './CommonStore';

class PostStore {

  @observable postList = []
  @observable post = {
    id: '',
    user: '',
    content: '',
    timestamp: '',
    updated: ''
  }

  @action addToPost = (instance) => {
    this.postList.push(...instance)
  }

  @action getPostList = () => {
    axios.get('/posts/', {
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    }).then((res) => {
      const posts = res.data.results
      console.log(posts)
      this.addToPost(posts)
    })
  }
}

export default new PostStore()