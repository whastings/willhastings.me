import App from 'app';
import bodyParser from 'body-parser';
import broccoli from 'broccoli/lib/middleware';
import builder from 'lib/builder';
import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import initDB from 'server/db/initDB';
import liveReload from 'server/utils/liveReload';
import path from 'path';
import renderHTML from 'server/middleware/renderHTML';
// Routes:
import appRoutes from 'server/routes/app';
import pagesRoutes from 'server/routes/pages';
import sessionsRoute from 'server/routes/sessions';

const COOKIE_SECRET = process.env.COOKIE_SECRET,
      IS_DEV = process.env.NODE_ENV === 'development',
      TEMPLATES_DIR = path.join(__dirname, 'templates');

export default class ServerManager {
  constructor() {
    this._connectToDb();

    let app = this.app = express();
    setUpViews(app);
    applyPreMiddleware(app);
    applyRoutes(app);
    applyPostMiddleware(app);
    if (IS_DEV) {
      setUpDevEnv(app);
    }
    this.server = http.createServer(app);
  }

  startServer(port) {
    this.server.listen(port);
  }

  stopServer(callback) {
    this.server.close(callback);
  }

  _connectToDb() {
    this.dbConnection = null;
    initDB().then((connection) => this.dbConnection = connection);
  }
}

function applyPostMiddleware(app) {
  app.get('*', renderHTML());
}

function applyPreMiddleware(app) {
  app.use(cookieParser(COOKIE_SECRET));
  app.use(bodyParser.json());
}

function applyRoutes(app) {
  [
    appRoutes,
    pagesRoutes,
    sessionsRoute
  ].forEach(route => route(app));
}

function setUpDevEnv(app) {
  let watcher = builder.watcher();
  app.use(broccoli(watcher));
  liveReload(watcher);
}

function setUpViews(app) {
  app.set('views', TEMPLATES_DIR);
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(TEMPLATES_DIR, 'layouts'),
    partialsDir: path.join(TEMPLATES_DIR, 'partials')
  }));
  app.set('view engine', '.hbs');
}
