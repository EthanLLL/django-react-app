import { observable, action } from 'mobx';
import axios from '../apis/axios';
import { Notification } from 'element-react';
import PostStore from './PostStore';

class CommentStore {

  @observable newComment = ''

  @action setNewComment = (newComment) => {
    this.newComment = newComment
  }

  @action clearCommentForm = () => {
    this.newComment = ''
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
          this.clearCommentForm()
        }
      })
  }
}

export default new CommentStore();