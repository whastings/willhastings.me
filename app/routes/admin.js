import page from 'page';
import store from 'app/store';

import { signIn } from 'app/actions/authActions';

export default function adminRoute(router) {
  router('/admin', function adminIndex(data, next) {
    let users = store.getState().models.users;
    data.props = {
      user: users[Object.keys(users)[0]] // TODO: This is gross!
    };
    next();
  });

  router('/admin/sign-in', function adminSignIn(data, next) {
    data.props = {onSubmit: submitSignIn};
    next();
  });
}

function submitSignIn(username, password) {
  let action = signIn(username, password);
  store.dispatch(action);
  action.payload.promise.then(() => page('/admin'));
}
