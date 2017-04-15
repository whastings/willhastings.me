// @flow

import { HomePage } from './components';
import { loadHomePage } from './actions';
import { getPage } from 'pages/selectors';
import { loadPosts } from 'posts/actions';
import { getPosts } from 'posts/selectors';
import type { RouteRequest, RouteResponse, GetState } from 'app/types';

export default {
  index(req: RouteRequest, res: RouteResponse, getState: GetState) {
    return Promise.all([res.dispatch(loadHomePage()), res.dispatch(loadPosts())])
      .then(() => {
        let state = getState();
        res.render(HomePage, {
          content: getPage(state, 'home').content,
          posts: getPosts(state)
        });
      });
  }
};
