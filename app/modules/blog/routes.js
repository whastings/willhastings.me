import React from 'react';
import { BlogIndexPage, PostPage } from './components';
import { loadPost, loadPosts } from 'posts/actions';
import { getPost, getPosts } from 'posts/selectors';

export default {
  index(req, store) {
    return store.dispatch(loadPosts())
      .then(() => {
        const posts = getPosts(store.getState());
        return <BlogIndexPage posts={posts} />;
      });
  },

  view(req, store) {
    const permalink = req.params.post;

    return store.dispatch(loadPost(permalink))
      .then(() => {
        const post = getPost(store.getState(), permalink);
        if (post) {
          return <PostPage post={post} />;
        } else {
          // TODO: Fix
          res.render404();
        }
      });
  }
};
