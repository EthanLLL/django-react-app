import { observable, set, action } from 'mobx';
import axios from '../apis/axios';
import { Notification } from 'element-react';

class PostStore {

  @observable postList = []
  @observable newPost = ''

  @action setNewPost = (content) => {
    this.newPost = content
  }

  @action addToPost = (instance) => {
    this.postList = []
    this.postList.push(...instance)
    this.postList.map((item, i) => {
      set(item, {comment_list: false})
      set(item, {idx: i})
      set(item, {comments: []})
    })
  }

  @action addCommentToPost = (instance, idx) =>{
    set(this.postList[idx], {comments: instance})
  }

  @action getCommentList = (post_id, idx) => {
    axios.get(`/comments/${post_id}/`)
      .then(res => {
        if (res.data.success === 1) {
          this.addCommentToPost(res.data.data, idx)
        }
      })
  }

  @action viewCommentList = (idx) => {
    this.postList[idx].comment_list = !this.postList[idx].comment_list
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
          title: 'success',
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