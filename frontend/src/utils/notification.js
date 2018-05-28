import { Notification } from 'element-react';

const notification = (res) => {
  const success = res.data.success
  const msg = res.data.msg
  return Notification({
    title: success === 1 ? 'success' : 'error',
    message: msg,
    duration: 2000,
    type: success === 1 ? 'success' : 'error'
  })
}

export default notification;