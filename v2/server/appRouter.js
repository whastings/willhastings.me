const express = require('express');
const handlebars = require('server/utils/handlebars');
const serialize = require('serialize-javascript');
const { renderToString } = require('react-dom/server');

const api = require('server/api');
const earlyFlush = require('server/utils/earlyFlush');
const loadApp = require('server/utils/loadApp');

const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();
let App = loadApp();

App.getRoutes().forEach((routeInfo) => {
  app.get(routeInfo.path, runRoute.bind(null, routeInfo));
});

module.exports = app;

function runRoute(routeInfo, req, res, next) {
  App = loadApp(); // In dev, this will hot-reload the app.
  const clientApp = new App({ api });
  const routeActions = {
    redirect: (path) => res.redirect(path),
    prepareToRender: () => earlyFlush(res),
  };

  clientApp.runRoute(routeInfo, req, routeActions)
    .then((element) => element && renderRouteResult(element, clientApp.getState(), req, res))
    .catch((error) => next(error));
}

function renderRouteResult(element, state, req, res) {
  return handlebars.render('end.hbs', {
    csrfToken: req.csrfToken(),
    data: serialize(state),
    html: renderToString(element),
    isDev: IS_DEV,
    // title: options.title ? `${options.title} - ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE
  })
  .then((renderedHtml) => {
    res.write(renderedHtml);
    res.end();
  });
}
