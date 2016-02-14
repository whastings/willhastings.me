import { deleteResource, getJSON, postJSON } from 'app/utils/request';

export default {
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
  }
};
