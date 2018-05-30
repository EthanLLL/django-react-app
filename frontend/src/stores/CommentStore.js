import { observable, action } from 'mobx';
import axios from '../apis/axios';
import PostStore from './PostStore';
import notification from '../utils/notification';

class CommentStore {

  @observable newComment = ''

  @action setNewComment = (newComment) => {
    this.newComment = newComment
  }

  @action clearCommentForm = (type) => {
    if (type === 'toPost') {
      this.newComment = ''
    } else if (type === 'toComment') {
      this.newCommentToComment = ''
    }
  }

  @action commentLike = (id, post_id, idx) => {
    axios.post(`/comments/like/${id}/`)
      .then(res => {
        if (res.data.success === 1) {
          PostStore.getCommentList(post_id, idx)
        }
        notification(res)
      })
  }

  @action createNewCommentToPost = (post_id, idx) => {
    const payload = {
      comment: this.newComment
    }
    axios.post(`/comments/${post_id}/`, payload)
      .then(res => {
        if (res.data.success === 1) {
          PostStore.getCommentList(post_id, idx)
          this.clearCommentForm('toPost')
          PostStore.postCommentCountAdd(idx)
        } else {
          this.clearCommentForm('toPost')
        }
        notification(res)
      })
  }
}

export default new CommentStore();