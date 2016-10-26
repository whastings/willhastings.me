import { BlogIndexPage, PostPage } from './components';
import { loadPost, loadPosts } from 'posts/actions';
import { getPost, getPosts } from 'posts/selectors';
import { withLoader } from 'app/utils/routeUtils';

export default {
  index: withLoader(function index(req, res, getState)  {
    return res.dispatch(loadPosts())
      .then(() => res.render(BlogIndexPage, {posts: getPosts(getState())}))
      .catch(res.handleError);
  }),

  view: withLoader(function view(req, res, getState) {
    let permalink = req.params.post;

    return res.dispatch(loadPost(permalink))
      // TODO: Handle post not found.
      .then(() => res.render(PostPage, {post: getPost(getState(), permalink)}))
      .catch(res.handleError);
  })
};
