import { HomePage } from './components';
import { loadHomePage } from './actions';
import { getPage } from 'pages/selectors';
import { loadPosts } from 'posts/actions';
import { getPosts } from 'posts/selectors';

export default {
  index(req, res, getState) {
    Promise.all([res.dispatch(loadHomePage()), res.dispatch(loadPosts())])
      .then(() => {
        let state = getState();
        res.render(HomePage, {
          content: getPage(state, 'home').content,
          posts: getPosts(state)
        });
      })
      .catch(console.log.bind(console));
  }
};
