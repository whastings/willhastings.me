export function addUser(user) {
  return {
    type: 'USER_ADD',
    payload: user
  };
}
