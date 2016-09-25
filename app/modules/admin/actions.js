import { addUser } from 'app/modules/users/actions';

export function clearCurrentUserId() {
  return {
    type: 'CURRENT_USER_ID_CLEAR'
  };
}

export function setCurrentUserId(id) {
  return {
    type: 'CURRENT_USER_ID_SET',
    payload: id
  };
}

export function signIn(username, password) {
  return (api, getState, dispatch) =>
    api.createSession(username, password)
      .then((session) => {
        let { user } = session;
        dispatch(addUser(user));
        return setCurrentUserId(user.id);
      });
}

export function signOut() {
  return (api) =>
    api.destroySession()
      .then(clearCurrentUserId);
}
