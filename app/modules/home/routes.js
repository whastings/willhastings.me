import { HomePage } from './components';
import { loadHomePage } from './actions';
import { loadPosts } from 'app/modules/posts/actions';

export default {
  index(req, res, store) {
    Promise.all([res.dispatch(loadHomePage()), res.dispatch(loadPosts())])
      .then(() => {
        let state = store.getState();
        res.render(HomePage, {
          content: state.pages.home.content,
          posts: store.getPosts()
        });
      })
      .catch(console.log.bind(console));
  }
};
