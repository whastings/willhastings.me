import { addUser } from 'app/modules/users/actions';
import { setCurrentUserId } from 'app/modules/admin/actions';

const SIGN_IN_PATH = '/admin/sign-in';

export default function requireSignedInUser(req, store, redirect) {
  const { currentUserId } = store.getState().admin;

  if (!currentUserId && req.currentUser) {
    store.dispatch(addUser(req.currentUser));
    store.dispatch(setCurrentUserId(req.currentUser.id));
  }

  if (!req.currentUser && req.path !== SIGN_IN_PATH) {
    redirect(SIGN_IN_PATH);
  }
}
