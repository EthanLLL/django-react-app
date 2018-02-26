import { observable, action } from 'mobx';
import axios from 'axios';

class PostStore {

  @observable postList = []
  @observable post = {
    id: '',
    user: '',
    content: '',
    timestamp: '',
    updated: ''
  }

  @action addToPost = (post) => {
    this.postList.push(post)
  }

  @action getPostList = () => {
    axios.get('/posts/', {
      headers: {
        "Authorization": 'JWT ' + localStorage.getItem('token')
      }
    }).then((res) => {
      const post = res.data.results
      console.log(post)
      console.log(this.postList.length)
      this.addToPost(post)
      alert('success fetch api from posts')
    })
  }
}

export default new PostStore()