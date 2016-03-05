import { addUser } from 'app/modules/users/actions';
import { setCurrentUserId } from 'app/modules/admin/actions';

export default function currentUserMiddleware(req, res, store, next) {
  let state = store.getState(),
      { currentUserId } = state.admin;

  if (!currentUserId && req.currentUser) {
    res.dispatchAction(addUser, req.currentUser);
    res.dispatchAction(setCurrentUserId, req.currentUser.id);
  }

  next();
}
