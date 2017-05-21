// @flow

import memoizeStateLookup from 'app/utils/memoizeStateLookup';
import { createSelector } from 'reselect';
import type { State } from 'app/types';
import type { Post, PostsState } from './types';

type GetPost = (state: State, permalink: string) => Post | null;

export const getPosts = createSelector(
  (state: State) => state.posts,
  (posts: PostsState) => Object.keys(posts)
    .map((postId) => posts[postId])
    .sort(comparePosts)
);

export const getPost: GetPost = memoizeStateLookup(
  getPosts,
  (posts, permalink) => posts.find((post) => post.permalink === permalink)
);

function comparePosts(post1: Post, post2: Post): number {
  if (!post1.published && !post2.published) {
    return post1.createdAt > post2.createdAt ? -1 : 1;
  }

  if (!post1.published) {
    return -1;
  }

  if (!post2.published) {
    return 1;
  }

  return post1.publishDate > post2.publishDate ? -1 : 1;
}
