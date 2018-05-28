import { observable, set, action } from 'mobx';
import axios from '../apis/axios';
import notification from '../utils/notification';

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

  @action postCommentCountAdd = (idx) => {
    set(this.postList[idx], {comments_count: this.postList[idx].comments_count + 1})
  }

  @action postLikeCountAdd = (idx) => {
    set(this.postList[idx], {likes: this.postList[idx].likes + 1})
  }

  @action postLike =(post_id, idx) => {
    axios.post(`/posts/like/${post_id}/`)
      .then(res => {
        if (res.data.success === 1) {
          this.postLikeCountAdd(idx)
        }
        notification(res)
      })
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
      notification(res)
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