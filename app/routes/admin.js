import AdminIndexPage from 'app/components/admin/AdminIndexPage';
import SignInPage from 'app/components/admin/SignInPage';
import { signIn } from 'app/actions/authActions';

export default {
  index(req, res, store) {
    let state = store.getState(),
        users = state.models.users,
        currentUserId = state.ui.currentUserId,
        currentUser = users[currentUserId];

    res.render(AdminIndexPage, {user: currentUser});
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
