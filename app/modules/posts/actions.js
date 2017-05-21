// @flow

import { getPost } from './selectors';
import type { AsyncAction } from 'app/types';
import type {
  Post,
  PostAddAction,
  PostsAddAction,
  PostRemoveAction,
  PostUpdateAction
} from './types';
import type { GetPostQueryParams, GetPostsQueryParams } from './api';

export function createPost(postData: Post): AsyncAction {
  return (api): Promise<PostAddAction> =>
    api.createPost(postData)
      .then((post) => ({type: 'POST_ADD', payload: post}));
}

export function deletePost(post: Post): AsyncAction {
  return (api): Promise<PostRemoveAction> =>
    api.deletePost(post.id)
      .then(() => ({type: 'POST_REMOVE', payload: post.id}));
}

export function loadPost(
  permalink: string,
  options?: GetPostQueryParams = { editable: false }
): AsyncAction {
  return (api, getState): Promise<PostAddAction | null> | null => {
    let post = getPost(getState(), permalink);
    let isEditable = options.editable;
    if (post && post.body && (!isEditable || post.bodyRaw)) {
      return null;
    }
    let queryParams = isEditable ? { editable: isEditable } : undefined;

    return api.getPost(permalink, queryParams)
      .then((post) => {
        if (!post || (!post.published && !getState().admin.currentUserId)) {
          return null;
        }

        return { type: 'POST_ADD', payload: post };
      });
  };
}

export function loadPosts(options?: GetPostsQueryParams): AsyncAction {
  return (api): Promise<PostsAddAction> =>
    api.getPosts(options)
      .then((posts) => ({type: 'POSTS_ADD', payload: posts}));
}

export function updatePost(postData: Post): AsyncAction {
  return (api): Promise<PostUpdateAction> =>
    api.savePost(postData)
      .then((post) => ({type: 'POST_UPDATE', payload: post}));
}
