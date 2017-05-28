// @flow

import type { User, UserAddAction } from './types';

export function addUser(user: User): UserAddAction {
  return {
    type: 'USER_ADD',
    payload: user
  };
}
