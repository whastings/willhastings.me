import api from 'server/api';
import App from 'app';
import { renderToString } from 'react-dom/server';

// TODO: Move to middleware.
const IS_DEV = process.env.NODE_ENV === 'development';

export default function appRoutes(serverApp) {
  App.routes.forEach((route) => serverApp.get(route, routeToApp));
}

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
