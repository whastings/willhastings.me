import 'app/styles/app.scss';
import appApi from 'app/api';
import createStore from 'app/createStore';
import MiddlewareMap from 'app/utils/middlewareMap';
import Page404 from 'ui/components/Page404';
import React from 'react';
import runRouteHandlers from 'app/utils/runRouteHandlers';
import UI from 'ui/components/UI';
import { autobindMethods } from '@whastings/js_utils';
import { PRE_MIDDLEWARE, ROUTES } from 'app/routes';
import { Provider } from 'react-redux';

export default class App {
  constructor(options) {
    this.options = options;
    options.api = options.api || appApi;
    this.store = createStore(options.api);
    this.preMiddleware = new MiddlewareMap(PRE_MIDDLEWARE);
  }

  handleError(error) {
    let { onError } = this.options;

    if (onError) {
      onError(error);
    }
  }

  handleWillRender() {
    let { onWillRender } = this.options;

    if (onWillRender) {
      onWillRender();
    }
  }

  redirect(path) {
    this.options.onRedirect(path);
  }

  render(Component, props = {}, options = {}) {
    this.options.renderer(
      <Provider store={this.store}>
        <UI>
          <Component {...props}/>
        </UI>
      </Provider>,
      options
    );
  }

  render404() {
    let { on404 } = this.options;

    if (on404) {
      on404();
    }

    this.render(Page404);
  }

  route(path, req) {
    const preMiddleware = this.preMiddleware.match(req.path);
    const routeHandler = ROUTES[path];
    let handlers = [];
    const { handleError, handleWillRender, store } = this;

    const res = {
      dispatch: store.dispatch,
      handleError,
      redirect: this.redirect,
      render: this.render,
      render404: this.render404
    };

    if (preMiddleware) {
      handlers = handlers.concat(preMiddleware);
    }
    if (routeHandler) {
      handlers.push(routeHandler);
    }

    runRouteHandlers(handlers, handleError, handleWillRender, [req, res, store.getState]);
  }
}

autobindMethods(App, 'handleError', 'handleWillRender', 'redirect', 'render', 'render404');

App.routes = Object.keys(ROUTES);
