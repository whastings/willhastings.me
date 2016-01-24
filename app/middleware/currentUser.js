import { addUser } from 'app/actions/userActions';
import { setCurrentUserId } from 'app/actions/uiActions';

export default function currentUserMiddleware(req, res, store) {
  let state = store.getState(),
      { currentUserId } = state.ui;

  if (!currentUserId && req.currentUser) {
    res.dispatchAction(addUser, req.currentUser);
    res.dispatchAction(setCurrentUserId, req.currentUser.id);
  }
}
