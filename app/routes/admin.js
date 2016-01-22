import AdminIndexPage from 'app/components/admin/AdminIndexPage';
import SignInPage from 'app/components/admin/SignInPage';
import { signIn } from 'app/actions/authActions';

export default {
  index(store, dispatchAction, render, redirect) {
    let state = store.getState(),
        users = state.models.users,
        currentUserId = state.ui.currentUserId,
        currentUser = currentUserId && users[currentUserId];

    if (currentUser) {
      render(AdminIndexPage, {user: currentUser});
    } else {
      redirect('/admin/sign-in');
    }
  },

  signIn(store, dispatchAction, render, redirect) {
    render(SignInPage, {
      onSubmit(username, password) {
        dispatchAction(signIn, username, password)
          .then(() => redirect('/admin'))
          .catch(console.log.bind(console));
      }
    });
  }
};
