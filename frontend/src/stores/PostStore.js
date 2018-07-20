import { observable, set, action, computed } from 'mobx';
import axios from '../apis/axios';
import notification from '../utils/notification';
import UserStore from './UserStore';

class PostStore {

  @observable postList = []
  @observable newPost = ''
  @observable hasNext = true
  @observable offset = 0;
  @observable limit = 3;

  // get post list
  @action setNextOffset = () => {
    this.offset = this.offset + this.limit
  }

  @computed get nextPage() {
    return `/posts/?offset=${this.offset}&limit=${this.limit}`
  }

  @action setNoMorePost = () => {
    this.hasNext = false
  }

  @action setMorePost = () => {
    this.hasNext = true
  }

  @action clearPostList = () => {
    this.postList = []
    this.offset = 0;
  }

  @action addToPost = (instance) => {
    this.postList.push(...instance)
    this.postList.map((item, i) => {
      set(item, {commentListToggle: false})
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
        this.setNextOffset()
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
      content: this.newPost
    }
    axios.post('/posts/create/', payload).then(res => {
      if (res.data.success === 1) {
        this.clearPostList()
        this.getPostList()
      }
      notification(res)
    })
  }

  @action deletePost = (id) => {
    axios.delete(`/posts/${id}/delete/`).then(res => {
      if (res.data.success === 1) {
        const idx = this.postList.findIndex(item => item.id === id)
        this.postList.splice(idx, 1)
      }
      notification(res)
    })
  }

  // get comment list
  @action getCommentList = (post_id) => {
    axios.get(`/comments/${post_id}/`)
      .then(res => {
        if (res.data.success === 1) {
          this.addCommentToPost(res.data.data, post_id)
        }
      })
  }

  @action viewCommentList = (id) => {
    const idx = this.postList.findIndex(item => item.id === id)
    const { commentListToggle } = this.postList[idx];
    this.postList[idx].commentListToggle = !commentListToggle;
  }

  @action addCommentToPost = (instance, post_id) =>{
    const idx = this.postList.findIndex(item => item.id === post_id)
    this.postList[idx].comments = []
    this.postList[idx].comments.push(...instance);
  }

  @action postCommentCountAdd = (id) => {
    const idx = this.postList.findIndex(item => item.id === id)
    const { comments_count } = this.postList[idx]
    this.postList[idx].comments_count = comments_count + 1
  }

  // post like
  @action postLikeCountAdd = (id) => {
    const idx = this.postList.findIndex(item => item.id === id)
    const { likes } = this.postList[idx];
    this.postList[idx].likes = likes + 1;
    UserStore.fetchUserInfo()
  }

  @action postLike =(post_id) => {
    axios.post(`/posts/like/${post_id}/`)
      .then(res => {
        if (res.data.success === 1) {
          this.postLikeCountAdd(post_id)
        }
        notification(res)
      })
  }
}

export default new PostStore()