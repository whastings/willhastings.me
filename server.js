import broccoli from 'broccoli/lib/middleware';
import builder from './lib/builder';
import express from 'express';
import handlebars from 'express-handlebars';
import liveReload from './lib/liveReload';
import renderReact from './middleware/renderReact';

const IS_PROD = process.env.NODE_ENV === 'production';

// Load routes.
import homeRoute from './routes/home';
import projectsRoute from './routes/projects';

var PORT = 8000;

var app = express();

// App settings:
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Apply routes.
[homeRoute, projectsRoute].forEach(route => route(app));

// Apply post-routes middleware.
app.get('*', renderReact());

// Asset rebuilding in dev.
if (!IS_PROD) {
  let watcher = builder.watcher()
  app.use(broccoli(watcher));
  liveReload(watcher);
}

console.log(`Listening on ${PORT}`);
app.listen(PORT);
