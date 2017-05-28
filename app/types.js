// @flow

import React from 'react';
import adminApi from 'admin/api';
import homeApi from 'home/api';
import postsApi from 'posts/api';
import type { AdminState } from 'admin/types';
import type { PageAddAction, PagesState } from 'pages/types';
import type { PostsState } from 'posts/types';
import type { UsersState } from 'users/types';

export type API =
  & typeof adminApi
  & typeof homeApi
  & typeof postsApi;

export type Action = PageAddAction;

export type State = {
  admin: AdminState,
  pages: PagesState,
  posts: PostsState,
  users: UsersState,
};

export type GetState = () => State;

export type AsyncAction = (api: API, getState: GetState) => any;

export type Dispatch = (action: Action | AsyncAction) => any;

export type RouteRequest = {

};

export type RouteResponse = {
  dispatch: Dispatch,
  render: (component: React.Component<*, *, *> | Function, props: Object) => void,
};
