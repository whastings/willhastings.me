import memoizeStateLookup from 'app/utils/memoizeStateLookup';
import { createSelector } from 'reselect';

export const getPosts = createSelector(
  (state) => state.posts,
  (posts) => Object.keys(posts)
    .map((postId) => posts[postId])
    .sort(comparePosts)
);

export const getPost = memoizeStateLookup(
  getPosts,
  (posts, permalink) => posts.find((post) => post.permalink === permalink)
);

function comparePosts(post1, post2) {
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
