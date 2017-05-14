const api = require('server/api');
const earlyFlush = require('server/utils/earlyFlush');
const express = require('express');
const handlebars = require('server/utils/handlebars');
const loadApp = require('server/utils/loadApp');
const serialize = require('serialize-javascript');
const { renderToString } = require('react-dom/server');

const IS_DEV = process.env.NODE_ENV === 'development';
const DEFAULT_PAGE_TITLE = 'Will Hastings';

const app = express();
let App = loadApp();

App.routes.forEach((route) => app.get(route, routeToApp));

function routeToApp(req, res, next) {
  App = loadApp(); // In dev, this will hot-reload the app.
  let app = new App({
    renderer: (element, options = {}) => {
      handlebars.render('end.hbs', {
        csrfToken: req.csrfToken(),
        data: serialize(app.store.getState()),
        html: renderToString(element),
        isDev: IS_DEV,
        title: options.title ? `${options.title} - ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE
      })
        .then((renderedHtml) => {
          res.write(renderedHtml);
          res.end();
        })
        .catch(next);
    },
    onRedirect: (path) => res.redirect(path),
    onError: next,
    onWillRender: () => earlyFlush(res),
    on404: () => res.status(404),
    api
  });

  app.route(req.route.path, req);
}

module.exports = app;
