import { BlogIndexPage, PostPage } from './components';
import { loadPost, loadPosts } from 'posts/actions';
import { getPost, getPosts } from 'posts/selectors';

export default {
  index(req, res, getState) {
    return res.dispatch(loadPosts())
      .then(() => res.render(BlogIndexPage, {posts: getPosts(getState())}));
  },

  view(req, res, getState) {
    let permalink = req.params.post;

    return res.dispatch(loadPost(permalink))
      .then(() => {
        let post = getPost(getState(), permalink);
        if (post) {
          res.render(PostPage, {post}, {title: post.title});
        } else {
          res.render404();
        }
      });
  }
};
