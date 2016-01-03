import bodyParser from 'body-parser';
import broccoli from 'broccoli/lib/middleware';
import builder from 'lib/builder';
import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import initDB from './db/initDB';
import liveReload from 'lib/liveReload';
import path from 'path';
import renderHTML from 'middleware/renderHTML';
import renderReact from 'middleware/renderReact';

const COOKIE_SECRET = process.env.COOKIE_SECRET,
      IS_PROD = process.env.NODE_ENV === 'production',
      PORT = 8000,
      TEMPLATES_DIR = path.join(__dirname, 'templates');

// Connect to DB.
initDB();

// Load routes.
import adminRoute from './routes/admin';
import homeRoute from './routes/home';
import projectsRoute from './routes/projects';
import sessionsRoute from './routes/sessions';

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

// Apply pre-route middleware.
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.json());

// Apply routes.
[
  adminRoute,
  homeRoute,
  projectsRoute,
  sessionsRoute
].forEach(route => route(app));

// Apply post-routes middleware.
app.get('*', renderReact());
app.get('*', renderHTML());

// Asset rebuilding in dev.
if (!IS_PROD) {
  let watcher = builder.watcher();
  app.use(broccoli(watcher));
  liveReload(watcher);
}

console.log(`Listening on ${PORT}`);
export default app.listen(PORT);
