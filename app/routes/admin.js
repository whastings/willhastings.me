import AdminIndexPage from 'app/components/admin/AdminIndexPage';
import SignInPage from 'app/components/admin/SignInPage';
import { signIn } from 'app/actions/authActions';

export default {
  index(req, res, store) {
    let state = store.getState(),
        users = state.models.users,
        currentUserId = state.ui.currentUserId,
        currentUser = currentUserId && users[currentUserId];

    if (currentUser) {
      res.render(AdminIndexPage, {user: currentUser});
    } else {
      res.redirect('/admin/sign-in');
    }
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
