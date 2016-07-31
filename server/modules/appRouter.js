const api = require('server/api');
const configViews = require('server/utils/configViews');
const express = require('express');
const reload = require('require-reload');
const { renderToString } = require('react-dom/server');

const APP_SRC = 'dist/server/app';
const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();
let App = require(APP_SRC).default;

configViews(app);
App.routes.forEach((route) => app.get(route, routeToApp));

function routeToApp(req, res) {
  if (IS_DEV) {
    App = reload(APP_SRC).default;
  }
  let app = new App((element) => {
    res.render('base', {
      data: JSON.stringify(app.store.getState()),
      html: renderToString(element),
      isDev: IS_DEV
    });
  }, res.redirect.bind(res), api);

  app.route(req.route.path, req);
}

module.exports = app;
