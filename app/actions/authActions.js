export function signIn(api, store, username, password) {
  return {
    type: 'SIGN_IN',
    payload: {
      promise: api.createSession(username, password)
        .then((session) => (action, dispatch) => {
          let { user } = session;
          dispatch({type: 'USER_ADD', payload: user});
          dispatch({type: 'CURRENT_USER_ID_SET', payload: user.id});
        })
    }
  };
}
