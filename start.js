import build from 'lib/build';
import path from 'path';
import ServerManager from 'server';

const DIST_DIR = path.join(process.cwd(), 'dist');
const PORT = 8000;

var serverManager;

// Run initial build.
build()
  .then(() => console.log('Build complete!'))
  .then(startServer)
  .then(() => console.log(`Server listening on port ${PORT}`))
  .catch(console.log.bind(console));

function startServer() {
  // Start server.
  serverManager = new ServerManager({staticDir: DIST_DIR});
  serverManager.startServer(PORT);
}

process.on('SIGTERM', function() {
  if (serverManager) {
    serverManager.stopServer(() => process.exit());
  } else {
    process.exit();
  }
});
