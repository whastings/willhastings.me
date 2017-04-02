require('lib/env');

const path = require('path');
const ServerManager = require('./server');

const DIST_DIR = path.join(process.cwd(), 'dist/client');
const PORT = process.env.PORT || 8000;

let serverManager = new ServerManager({staticDir: DIST_DIR});
serverManager.startServer(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`));

function stop() {
  serverManager.stopServer(() => process.exit());
}

process.on('SIGTERM', stop);
// For nodemon:
process.on('SIGUSR2', stop);
