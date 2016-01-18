export function signIn(api, store, username, password) {
  return {
    type: 'SIGN_IN',
    payload: {
      promise: api.createSession(username, password)
        .then((session) => {
          return {type: 'USER_ADD', payload: session.user};
        })
    }
  };
}
