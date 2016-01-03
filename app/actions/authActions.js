import { post } from 'app/utils/apiRequest';

export function signIn(username, password) {
  return {
    type: 'SIGN_IN',
    payload: {
      promise: post('sessions', {user: {username, password}})
        .then((session) => {
          return {type: 'USER_ADD', payload: session.user};
        })
    }
  };
}
