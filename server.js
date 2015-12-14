import broccoli from 'broccoli/lib/middleware';
import builder from 'lib/builder';
import express from 'express';
import handlebars from 'express-handlebars';
import initDB from './db/initDB';
import liveReload from 'lib/liveReload';
import path from 'path';
import renderReact from 'middleware/renderReact';

const IS_PROD = process.env.NODE_ENV === 'production',
      PORT = 8000,
      TEMPLATES_DIR = path.join(__dirname, 'templates');

// Connect to DB.
initDB();

// Load routes.
import homeRoute from './routes/home';
import projectsRoute from './routes/projects';

const app = express();

// App settings:
app.set('views', TEMPLATES_DIR);
app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(TEMPLATES_DIR, 'layouts'),
  partialsDir: path.join(TEMPLATES_DIR, 'partials')
}));
app.set('view engine', '.hbs');

// Apply routes.
[homeRoute, projectsRoute].forEach(route => route(app));

// Apply post-routes middleware.
app.get('*', renderReact());

// Asset rebuilding in dev.
if (!IS_PROD) {
  let watcher = builder.watcher();
  app.use(broccoli(watcher));
  liveReload(watcher);
}

console.log(`Listening on ${PORT}`);
export default app.listen(PORT);
