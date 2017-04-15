import {
  deleteResource,
  getJSON,
  postJSON,
  putJSON,
  stringifyQueryParams
} from 'app/utils/request';

export default {
  createPost(postData) {
    return postJSON('/api/posts', {post: postData});
  },

  deletePost(postId) {
    return deleteResource(`/api/posts/${postId}`);
  },

  getPost(permalink, queryParams = null) {
    let url = `/api/posts/${permalink}`;
    url = queryParams ? url + stringifyQueryParams(queryParams) : url;
    return getJSON(url);
  },

  getPosts(queryParams = null) {
    let url = '/api/posts';
    url = queryParams ? url + stringifyQueryParams(queryParams) : url;
    return getJSON(url);
  },

  savePost(postData) {
    return putJSON(`/api/posts/${postData.id}`, {post: postData});
  }
};
