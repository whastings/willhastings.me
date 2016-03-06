import api from 'server/api';
import App from 'app';
import configViews from 'server/utils/configViews';
import express from 'express';
import { renderToString } from 'react-dom/server';

// TODO: Move to middleware.
const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();

configViews(app);
App.routes.forEach((route) => app.get(route, routeToApp));

function routeToApp(req, res) {
  let app = new App((element) => {
    res.render('base', {
      data: JSON.stringify(app.store.getState()),
      html: renderToString(element),
      isDev: IS_DEV
    });
  }, res.redirect.bind(res), api);

  app.route(req.route.path, req);
}

export default app;
