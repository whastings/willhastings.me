import { BlogIndexPage, PostPage } from './components';
import { loadPost, loadPosts } from 'posts/actions';
import { getPost, getPosts } from 'posts/selectors';

export default {
  index(req, res, getState)  {
    res.dispatch(loadPosts())
      .then(() => res.render(BlogIndexPage, {posts: getPosts(getState())}))
      .catch(res.handleError);
  },

  view(req, res, getState) {
    let permalink = req.params.post;

    res.dispatch(loadPost(permalink))
      // TODO: Handle post not found.
      .then(() => res.render(PostPage, {post: getPost(getState(), permalink)}))
      .catch(res.handleError);
  }
};
