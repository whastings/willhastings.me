require('dotenv').config();

const path = require('path');
const ServerManager = require('./server');

const DIST_DIR = path.join(process.cwd(), 'dist/client');
const PORT = 8000;

let serverManager = new ServerManager({staticDir: DIST_DIR});
serverManager.startServer(PORT);

if (process.env.NODE_ENV === 'development') {
  require('./lib/liveReload');
}

process.on('SIGTERM', () => serverManager.stopServer(() => process.exit()));
// For nodemon:
process.on('SIGUSR2', () => serverManager.stopServer(() => process.kill(process.pid, 'SIGUSR2')));
