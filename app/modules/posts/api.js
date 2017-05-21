// @flow

import {
  deleteResource,
  getJSON,
  postJSON,
  putJSON,
  stringifyQueryParams
} from 'app/utils/request';
import type { Post } from './types';

export type GetPostQueryParams = {
  editable: boolean,
};

export type GetPostsQueryParams = {
  includeUnpublished: boolean,
};

export default {
  createPost(postData: Post): Promise<Post> {
    return postJSON('/api/posts', { post: postData });
  },

  deletePost(postId: number): Promise<Response> {
    return deleteResource(`/api/posts/${postId}`);
  },

  getPost(permalink: string, queryParams: ?GetPostQueryParams = null): Promise<Post> {
    let url = `/api/posts/${permalink}`;
    url = queryParams ? url + stringifyQueryParams(queryParams) : url;
    return getJSON(url)
      .then((post) => {
        if (Array.isArray(post)) {
          throw new Error('Expected object, got array');
        }
        return post;
      });
  },

  getPosts(queryParams: ?GetPostsQueryParams = null): Promise<Post[]> {
    let url = '/api/posts';
    url = queryParams ? url + stringifyQueryParams(queryParams) : url;
    return getJSON(url)
      .then((posts) => {
        if (!Array.isArray(posts)) {
          throw new Error('Expected array.');
        }
        return posts;
      });
  },

  savePost(postData: Post): Promise<Post> {
    return putJSON(`/api/posts/${postData.id}`, { post: postData });
  }
};
