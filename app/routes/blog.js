import BlogIndexPage from 'app/components/blog/BlogIndexPage';
import PostPage from 'app/components/blog/PostPage';
import { loadPost, loadPosts } from 'app/actions/postActions';

export default {
  index(req, res, store)  {
    res.dispatchAction(loadPosts)
      .then(() => res.render(BlogIndexPage, {posts: store.getPosts()}))
      .catch(console.log.bind(console));
  },

  view(req, res, store) {
    let permalink = req.params.post;
    res.dispatchAction(loadPost, permalink)
      .then(() => res.render(PostPage, {post: store.getPost(permalink)}))
      .catch(console.log.bind(console));
  }
};
