import { deleteResource, getJSON, postJSON, putJSON } from 'app/utils/request';

export default {
  createPost(postData) {
    return postJSON('/api/posts', {post: postData});
  },

  createSession(username, password) {
    return postJSON('/api/session', {user: {username, password}});
  },

  destroySession() {
    return deleteResource('/api/session');
  },

  getPage(page) {
    return getJSON(`/api/pages/${page}`);
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
