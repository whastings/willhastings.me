import React from 'react';
import { Provider } from 'react-redux';

import 'app/styles/app.scss';
import appApi from 'app/api';
import createStore from 'app/createStore';
import routes from './routes';
import UI from 'ui/components/UI';

export default class App {
  static getRoutes() {
    return routes;
  }

  constructor(options = {}) {
    this.options = options;
    this.store = createStore(this.options.api || appApi);
  }

  getState() {
    return this.store.getState();
  }

  runRoute(routeInfo, req, actions) {
    const { module, name } = routeInfo;
    const shouldRunRoute = this._runBeforeHook(routeInfo, req, actions);

    if (!shouldRunRoute) {
      return Promise.resolve();
    }

    if (actions.prepareToRender) {
      actions.prepareToRender();
    }

    return loadRoute(module, name)
      .then((route) => route(req, this.store))
      .then((result) => this._render(result));
  }

  _render(content) {
    return (
      <Provider store={this.store}>
        <UI>
          {content}
        </UI>
      </Provider>
    );
  }

  _runBeforeHook(routeInfo, req, actions) {
    if (!routeInfo.before) {
      return true;
    }

    let didBeforeHookRedirect = false;
    const redirect = (path) => {
      didBeforeHookRedirect = true;
      actions.redirect(path);
    };

    routeInfo.before(req, this.store, redirect);

    return !didBeforeHookRedirect;
  }
}

function loadRoute(moduleName, routeName) {
  return import(`app/modules/${moduleName}/routes`)
    .then((routes) => routes.default[routeName]);
}
