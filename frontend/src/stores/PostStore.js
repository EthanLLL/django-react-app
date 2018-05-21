import { observable, action } from 'mobx';
import axios from '../apis/axios';
import { Notification } from 'element-react';

class PostStore {

  @observable postList = []
  @observable post = {
    id: '',
    user: '',
    content: '',
    timestamp: '',
    updated: ''
  }
  @observable newPost = ''

  @action setNewPost = (content) => {
    this.newPost = content
  }

  @action addToPost = (instance) => {
    this.postList = []
    this.postList.push(...instance)
  }

  @action clearNewPost() {
    this.newPost = ''
  }

  @action createPost = () => {
    const payload = {
      'content': this.newPost
    }
    axios.post('/posts/create/', payload).then(res => {
      if (res.data.success === 1) {
        Notification({
          title: '操作成功',
          message: res.data.msg,
          duration: 2000,
          type: 'success'
        })
      }
      this.getPostList()
    })
  }

  @action getPostList = () => {
    axios.get('/posts/').then((res) => {
      const posts = res.data.results
      this.addToPost(posts)
    })
  }
}

export default new PostStore()