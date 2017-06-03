import React from 'react';
import { HomePage } from './components';
import { loadHomePage } from './actions';
import { getPage } from 'pages/selectors';
import { loadPosts } from 'posts/actions';
import { getPosts } from 'posts/selectors';

export default {
  index(req, store) {
    return Promise.all([store.dispatch(loadHomePage()), store.dispatch(loadPosts())])
      .then(() => {
        const state = store.getState();
        const content = getPage(state, 'home').content;
        const posts = getPosts(state);
        return <HomePage content={content} posts={posts} />;
      });
  }
};
