import AdminIndexPage from 'app/components/admin/AdminIndexPage';
import SignInPage from 'app/components/admin/SignInPage';
import { signIn } from 'app/actions/authActions';

export default {
  index(store, dispatchAction, render, redirect)  {
    let users = store.getState().models.users,
        user = users[Object.keys(users)[0]]; // TODO: This is gross!

    if (user) {
      render(AdminIndexPage, {user});
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
