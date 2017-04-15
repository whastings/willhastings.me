// @flow

import homeApi from 'home/api';
import React from 'react';
import { PageAddAction, PagesState } from 'pages/types';

export type API = typeof homeApi;

export type Action = PageAddAction;

export type State = {
  pages: PagesState,
};

export type GetState = () => State;

export type AsyncAction = (api: API, getState: GetState) => Promise<Action> | null;

export type Dispatch = (action: Action | AsyncAction) => any;

export type RouteRequest = {

};

export type RouteResponse = {
  dispatch: Dispatch,
  render: (component: React.Component<*, *, *> | Function, props: Object) => void,
};
