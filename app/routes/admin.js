import AdminIndexPage from 'app/components/admin/AdminIndexPage';
import SignInPage from 'app/components/admin/SignInPage';
import { signIn } from 'app/actions/authActions';
import { loadPosts } from 'app/actions/postActions';

export default {
  index(req, res, store) {
    res.dispatchAction(loadPosts)
      .then(() => res.render(AdminIndexPage, {posts: store.getPosts()}))
      .catch(console.log.bind(console));
  },

  signIn(req, res) {
    res.render(SignInPage, {
      onSubmit(username, password) {
        res.dispatchAction(signIn, username, password)
          .then(() => res.redirect('/admin'))
          .catch(console.log.bind(console));
      }
    });
  }
};
