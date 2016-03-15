import { getJSON, postJSON, putJSON, sendDelete } from 'app/utils/request';

export default {
  createPost(postData) {
    return postJSON('/api/posts', {post: postData});
  },

  deletePost(postId) {
    return sendDelete(`/api/posts/${postId}`);
  },

  getPost(permalink) {
    return getJSON(`/api/posts/${permalink}`);
  },

  getPosts() {
    return getJSON('/api/posts');
  },

  savePost(postData) {
    return putJSON(`/api/posts/${postData.id}`, {post: postData});
  }
};
