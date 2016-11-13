const api = require('server/api');
const configViews = require('server/utils/configViews');
const express = require('express');
const loadApp = require('server/utils/loadApp');
const { renderToString } = require('react-dom/server');

const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();
let App = loadApp();

configViews(app);
App.routes.forEach((route) => app.get(route, routeToApp));

function routeToApp(req, res, next) {
  App = loadApp(); // In dev, this will hot-reload the app.
  let app = new App({
    renderer: (element) => {
      res.render('base', {
        assets: res.assets,
        csrfToken: req.csrfToken(),
        data: JSON.stringify(app.store.getState()),
        html: renderToString(element),
        isDev: IS_DEV
      });
    },
    onRedirect: res.redirect.bind(res),
    onError: next,
    on404: () => res.status(404),
    api
  });

  app.route(req.route.path, req);
}

module.exports = app;
