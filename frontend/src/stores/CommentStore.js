import { observable, action } from 'mobx';
import axios from '../apis/axios';
import { Notification } from 'element-react';
import PostStore from './PostStore';

class CommentStore {

  @observable newComment = ''
  @observable newCommentToComment = ''

  @action setNewComment = (newComment) => {
    this.newComment = newComment
  }

  @action setNewCommentToComment = (newCommentToComment) => {
    this.newCommentToComment = newCommentToComment
  }

  @action clearCommentForm = (type) => {
    if (type === 'toPost') {
      this.newComment = ''
    } else if (type === 'toComment') {
      this.newCommentToComment = ''
    }
  }

  @action createNewCommentToPost = (post_id, idx) => {
    const payload = {
      comment: this.newComment
    }
    axios.post(`/comments/${post_id}/`, payload)
      .then(res => {
        if (res.data.success === 1) {
          Notification({
            title: 'success',
            message: res.data.msg,
            duration: 2000,
            type: 'success'
          })
          PostStore.getCommentList(post_id, idx)
          this.clearCommentForm('toPost')
        }
      })
  }

  @action createNewCommentToComment = (post_id, idx) => {
    const payload = {
      comment: this.newComment
    }
    axios.post(`/comments/${post_id}/`, payload)
      .then(res => {
        if (res.data.success === 1) {
          Notification({
            title: 'success',
            message: res.data.msg,
            duration: 2000,
            type: 'success'
          })
          PostStore.getCommentList(post_id, idx)
          this.clearCommentForm('toComment')
        }
      })
  }
}

export default new CommentStore();