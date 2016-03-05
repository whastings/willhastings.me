import { getJSON, postJSON, putJSON } from 'app/utils/request';

export default {
  createPost(postData) {
    return postJSON('/api/posts', {post: postData});
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
