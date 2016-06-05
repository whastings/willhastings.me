import App from 'app';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import configViews from 'server/utils/configViews';
import express from 'express';
import http from 'http';
import initDB from 'server/db/initDB';
import ROUTES from './routes';
import userLookup from 'server/middleware/userLookup';

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const IS_DEV = process.env.NODE_ENV === 'development';

export default class ServerManager {
  constructor(options) {
    this.options = options;
    this._connectToDb();

    let app = this.app = express();
    configViews(app);
    applyPreMiddleware(app, this.dbConnection);
    applyRoutes(app);
    if (IS_DEV) {
      app.use(express.static(options.staticDir));
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
