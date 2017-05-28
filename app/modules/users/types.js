// @flow

type UserId = string;

export type User = {
  id: UserId,
  username: string,
  createdAt: string,
  updatedAt: string,
};

export type Session = {
  user: User,
};

export type UsersState = {
  [UserId]: User,
};

export type UserAddAction = {
  type: 'USER_ADD',
  payload: User,
};
