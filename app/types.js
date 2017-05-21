// @flow

import React from 'react';
import homeApi from 'home/api';
import postsApi from 'posts/api';
import type { AdminState } from 'admin/types';
import type { PageAddAction, PagesState } from 'pages/types';
import type { PostsState } from 'posts/types';

export type API =
  & typeof homeApi
  & typeof postsApi;

export type Action = PageAddAction;

export type State = {
  admin: AdminState,
  pages: PagesState,
  posts: PostsState,
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
