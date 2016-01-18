var babelConfig = require('./config/babel-node'),
    builder = require('./lib/builder'),
    path = require('path');

var PORT = 8000,
    serverManager;

// Run initial build.
builder.build(path.join(__dirname, 'dist'))
  .then(startServer)
  .catch(console.log.bind(console));

function startServer() {
  // Process all further dependencies through Babel.
  require('babel-core/register')(babelConfig);

  // Start server.
  var ServerManager = require('./server').default;
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
