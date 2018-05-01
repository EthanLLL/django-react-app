import { observable, action } from 'mobx';
import axios from '../apis/axios';
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
    this.postList = []
    this.postList.push(...instance)
  }

  @action getPostList = () => {
    axios.get('/posts/').then((res) => {
      const posts = res.data.results
      console.log(posts)
      this.addToPost(posts)
    })
  }
}

export default new PostStore()