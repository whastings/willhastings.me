import builder from 'lib/builder';
import path from 'path';
import ServerManager from 'server';

const PORT = 8000;

var serverManager;

// Run initial build.
builder.build(path.join(__dirname, 'dist'))
  .then(startServer)
  .catch(console.log.bind(console));

function startServer() {
  // Start server.
  serverManager = new ServerManager();
  serverManager.startServer(PORT);
}

process.on('SIGTERM', function() {
  if (serverManager) {
    serverManager.stopServer(() => process.exit());
  } else {
    process.exit();
  }
});
