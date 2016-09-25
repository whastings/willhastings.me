import { addUser } from 'app/modules/users/actions';
import { setCurrentUserId } from 'app/modules/admin/actions';

export default function currentUserMiddleware(req, res, store, next) {
  let state = store.getState(),
      { currentUserId } = state.admin;

  if (!currentUserId && req.currentUser) {
    res.dispatch(addUser(req.currentUser));
    res.dispatch(setCurrentUserId(req.currentUser.id));
  }

  next();
}
