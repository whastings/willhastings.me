import memoizeStateLookup from 'app/utils/memoizeStateLookup';
import { createSelector } from 'reselect';

export default function postsSelectors(store) {
  store.getPosts = createSelector(
    () => store.getState().models.posts,
    (posts) => Object.keys(posts)
      .map((postId) => posts[postId])
      .sort((post1, post2) => post1.createdAt > post2.createdAt ? 1 : -1)
  );

  store.getPost = memoizeStateLookup(
    store.getPosts,
    (posts, permalink) => posts.find((post) => post.permalink === permalink)
  );
}