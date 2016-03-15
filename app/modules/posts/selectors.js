import memoizeStateLookup from 'app/utils/memoizeStateLookup';
import { createSelector } from 'reselect';

export const getPosts = createSelector(
  (state) => state.models.posts,
  (posts) => Object.keys(posts)
    .map((postId) => posts[postId])
    .sort((post1, post2) => post1.createdAt > post2.createdAt ? 1 : -1)
);

export default function postsSelectors(store) {
  store.getPosts = () => getPosts(store.getState()),

  store.getPost = memoizeStateLookup(
    store.getPosts,
    (posts, permalink) => posts.find((post) => post.permalink === permalink)
  );
}
