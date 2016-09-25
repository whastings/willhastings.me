import 'app/styles/app.scss';
import appApi from 'app/api';
import createStore from 'app/createStore';
import MiddlewareMap from 'app/utils/middlewareMap';
import React from 'react';
import runRouteHandlers from 'app/utils/runRouteHandlers';
import { autobindMethods } from '@whastings/js_utils';
import { PRE_MIDDLEWARE, ROUTES } from 'app/routes';
import { Provider } from 'react-redux';

export default class App {
  constructor(renderer, onRedirect, api = appApi) {
    this.api = api;
    this.onRedirect = onRedirect;
    this.renderer = renderer;
    this.store = createStore(api);
    this.preMiddleware = new MiddlewareMap(PRE_MIDDLEWARE);
  }

  redirect(path) {
    this.onRedirect(path);
  }

  render(Component, props) {
    this.renderer(
      <Provider store={this.store}>
        <Component {...props}/>
      </Provider>
    );
  }

  route(path, req) {
    let preMiddleware = this.preMiddleware.match(req.path),
        routeHandler = ROUTES[path],
        handlers = [],
        { store } = this;

    let res = {
      dispatch: store.dispatch,
      redirect: this.redirect,
      render: this.render
    };

    if (preMiddleware) {
      handlers = handlers.concat(preMiddleware);
    }
    if (routeHandler) {
      handlers.push(routeHandler);
    }

    runRouteHandlers(handlers, [req, res, store.getState]);
  }
}

autobindMethods(App, 'redirect', 'render');

App.routes = Object.keys(ROUTES);
