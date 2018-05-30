import { observable, set, action } from 'mobx';
import axios from '../apis/axios';
import notification from '../utils/notification';
import UserStore from './UserStore';

class PostStore {

  @observable postList = []
  @observable newPost = ''
  @observable nextPage = '/posts/'
  @observable hasNext = true

  // get post list
  @action setNextPage = (next) => {
    this.nextPage = next
  }

  @action setNoMorePost = () => {
    this.hasNext = false
  }

  @action setMorePost = () => {
    this.hasNext = true
  }

  @action clearPostList = () => {
    this.postList = []
    this.nextPage = '/posts/'
  }

  @action addToPost = (instance) => {
    this.postList.push(...instance)
    this.postList.map((item, i) => {
      set(item, {comment_list: false})
      set(item, {idx: i})
      set(item, {comments: []})
    })
  }

  @action getPostList = () => {
    axios.get(this.nextPage).then((res) => {
      const posts = res.data.results
      this.addToPost(posts)
      if (res.data.next === null) {
        this.setNoMorePost()
      } else {
        this.setNextPage(res.data.next)
        this.setMorePost()
      }
    })
  }

  // post new post
  @action setNewPost = (content) => {
    this.newPost = content
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
        this.clearPostList()
        this.getPostList()
      }
      notification(res)
    })
  }

  // get comment list
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

  @action addCommentToPost = (instance, idx) =>{
    set(this.postList[idx], {comments: instance})
  }

  @action postCommentCountAdd = (idx) => {
    set(this.postList[idx], {comments_count: this.postList[idx].comments_count + 1})
  }

  // post like
  @action postLikeCountAdd = (idx) => {
    set(this.postList[idx], {likes: this.postList[idx].likes + 1})
    UserStore.fetchUserInfo()
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
}

export default new PostStore()