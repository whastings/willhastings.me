import {
  getJSON,
  postJSON,
  putJSON,
  sendDelete,
  stringifyQueryParams
} from 'app/utils/request';

export default {
  createPost(postData) {
    return postJSON('/api/posts', {post: postData});
  },

  deletePost(postId) {
    return sendDelete(`/api/posts/${postId}`);
  },

  getPost(permalink, queryParams) {
    let url = `/api/posts/${permalink}`;
    url = queryParams ? url + stringifyQueryParams(queryParams) : url;
    return getJSON(url);
  },

  getPosts() {
    return getJSON('/api/posts');
  },

  savePost(postData) {
    return putJSON(`/api/posts/${postData.id}`, {post: postData});
  }
};
