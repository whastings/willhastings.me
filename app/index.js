import appApi from 'app/api';
import autobind from 'autobind-decorator';
import createStore from 'app/createStore';
import MiddlewareMap from 'app/utils/middlewareMap';
import React from 'react';
import runRouteHandlers from 'app/utils/runRouteHandlers';
import { PRE_MIDDLEWARE, ROUTES } from 'app/routes';

export default class App {
  constructor(renderer, onRedirect, api = appApi) {
    this.api = api;
    this.onRedirect = onRedirect;
    this.renderer = renderer;
    this.store = createStore();
    this.preMiddleware = new MiddlewareMap(PRE_MIDDLEWARE);
  }

  @autobind
  dispatchAction(actionCreator, ...args) {
    let action = actionCreator(this.api, this.store, this.dispatchAction, ...args),
        actionPromise;

    if (action) {
      this.store.dispatch(action);
      actionPromise = action.payload.promise;
    }

    return actionPromise || Promise.resolve(action && action.payload);
  }

  @autobind
  redirect(path) {
    this.onRedirect(path);
  }

  @autobind
  render(component, props) {
    this.renderer(React.createElement(component, props));
  }

  route(path, req) {
    let preMiddleware = this.preMiddleware.match(req.path),
        routeHandler = ROUTES[path],
        handlers = [],
        { store } = this;

    let res = {
      dispatchAction: this.dispatchAction,
      redirect: this.redirect,
      render: this.render
    };

    if (preMiddleware) {
      handlers = handlers.concat(preMiddleware);
    }
    if (routeHandler) {
      handlers.push(routeHandler);
    }

    runRouteHandlers(handlers, [req, res, store]);
  }
}

App.routes = Object.keys(ROUTES);
