import adminRoutes from 'app/routes/admin';
import appApi from 'app/api';
import createStore from 'app/createStore';
import currentUserMiddleware from 'app/middleware/currentUser';
import homeRoute from 'app/routes/home';
import MiddlewareMap from 'app/utils/middlewareMap';
import projectsRoute from 'app/routes/projects';
import React from 'react';

const PRE_MIDDLEWARE = {
  '/admin*': currentUserMiddleware
};

const ROUTES = {
  '/': homeRoute,
  '/projects': projectsRoute,
  '/admin': adminRoutes.index,
  '/admin/sign-in': adminRoutes.signIn
};

export default class App {
  constructor(renderer, onRedirect, api = appApi) {
    this.api = api;
    this.onRedirect = onRedirect;
    this.renderer = renderer;
    this.store = createStore();
    this.preMiddleware = new MiddlewareMap(PRE_MIDDLEWARE);

    this.dispatchAction = this.dispatchAction.bind(this);
    this.redirect = this.redirect.bind(this);
    this.render = this.render.bind(this);
  }

  dispatchAction(actionCreator, ...args) {
    let action = actionCreator(this.api, this.store, this.dispatchAction, ...args),
        actionPromise = action.payload.promise;
    this.store.dispatch(action);

    return actionPromise || Promise.resolve(action.payload);
  }

  redirect(path) {
    this.onRedirect(path);
  }

  render(component, props) {
    this.renderer(React.createElement(component, props));
  }

  route(path, req) {
    let preMiddleware = this.preMiddleware.match(req.path),
        handler = ROUTES[path],
        { store } = this;

    let res = {
      dispatchAction: this.dispatchAction,
      redirect: this.redirect,
      render: this.render
    };

    preMiddleware && preMiddleware(req, res, this.store);
    handler && handler(req, res, this.store);
  }
}

App.routes = Object.keys(ROUTES);
