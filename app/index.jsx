import 'app/styles/app.scss';
import appApi from 'app/api';
import createStore from 'app/createStore';
import MiddlewareMap from 'app/utils/middlewareMap';
import React from 'react';
import runRouteHandlers from 'app/utils/runRouteHandlers';
import UI from 'ui/components/UI';
import { autobindMethods } from '@whastings/js_utils';
import { PRE_MIDDLEWARE, ROUTES } from 'app/routes';
import { Provider } from 'react-redux';

export default class App {
  constructor(renderer, onRedirect, onError, api = appApi) {
    this.api = api;
    this.onRedirect = onRedirect;
    this.onError = onError;
    this.renderer = renderer;
    this.store = createStore(api);
    this.preMiddleware = new MiddlewareMap(PRE_MIDDLEWARE);
  }

  handleError(error) {
    this.onError(error);
  }

  redirect(path) {
    this.onRedirect(path);
  }

  render(Component, props) {
    this.renderer(
      <Provider store={this.store}>
        <UI>
          <Component {...props}/>
        </UI>
      </Provider>
    );
  }

  route(path, req) {
    let preMiddleware = this.preMiddleware.match(req.path),
        routeHandler = ROUTES[path],
        handlers = [],
        { handleError, store } = this;

    let res = {
      dispatch: store.dispatch,
      handleError,
      redirect: this.redirect,
      render: this.render
    };

    if (preMiddleware) {
      handlers = handlers.concat(preMiddleware);
    }
    if (routeHandler) {
      handlers.push(routeHandler);
    }

    runRouteHandlers(handlers, handleError, [req, res, store.getState]);
  }
}

autobindMethods(App, 'handleError', 'redirect', 'render');

App.routes = Object.keys(ROUTES);
