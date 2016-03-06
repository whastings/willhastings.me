import App from 'app';
import bodyParser from 'body-parser';
import broccoli from 'broccoli/lib/middleware';
import builder from 'lib/builder';
import cookieParser from 'cookie-parser';
import configViews from 'server/utils/configViews';
import express from 'express';
import http from 'http';
import initDB from 'server/db/initDB';
import liveReload from 'server/utils/liveReload';
import ROUTES from './routes';
import userLookup from 'server/middleware/userLookup';

const COOKIE_SECRET = process.env.COOKIE_SECRET,
      IS_DEV = process.env.NODE_ENV === 'development';

export default class ServerManager {
  constructor() {
    this._connectToDb();

    let app = this.app = express();
    configViews(app);
    applyPreMiddleware(app, this.dbConnection);
    applyRoutes(app);
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

function applyPreMiddleware(app, db) {
  app.use(cookieParser(COOKIE_SECRET));
  app.use(bodyParser.json());
  app.use(/\/(?!(?:scripts|styles))\w+/, userLookup(db));
}

function applyRoutes(app) {
  Object.keys(ROUTES).forEach((route) => app.use(route, ROUTES[route]));
}

function setUpDevEnv(app) {
  let watcher = builder.watcher();
  app.use(broccoli(watcher));
  liveReload(watcher);
}
