import { addUser } from 'app/modules/users/actions';
import { setCurrentUserId } from 'app/modules/admin/actions';

export default function currentUserMiddleware(req, res, getState, next) {
  let { currentUserId } = getState().admin;

  if (!currentUserId && req.currentUser) {
    res.dispatch(addUser(req.currentUser));
    res.dispatch(setCurrentUserId(req.currentUser.id));
  }

  next();
}
