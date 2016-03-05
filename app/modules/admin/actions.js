import { addUser } from 'app/modules/users/actions';

export function clearCurrentUserId() {
  return {
    type: 'CURRENT_USER_ID_CLEAR'
  };
}

export function setCurrentUserId(api, store, dispatchAction, id) {
  return {
    type: 'CURRENT_USER_ID_SET',
    payload: id
  };
}

export function signIn(api, store, dispatchAction, username, password) {
  return {
    type: 'SIGN_IN',
    payload: {
      promise: api.createSession(username, password)
        .then((session) => (action, dispatch) => {
          let { user } = session;
          dispatchAction(addUser, user);
          dispatchAction(setCurrentUserId, user.id);
        })
    }
  };
}

export function signOut(api, store, dispatchAction) {
  return {
    type: 'SIGN_OUT',
    payload: {
      promise: api.destroySession()
        .then(() => dispatchAction(clearCurrentUserId))
    }
  };
}
