export function addUser(api, store, dispatchAction, user) {
  return {
    type: 'USER_ADD',
    payload: user
  };
}
