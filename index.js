var babelConfig = require('./config/babel-node'),
    builder = require('./lib/builder'),
    path = require('path');

// Run initial build.
builder.build(path.join(__dirname, 'dist'))
  .then(startServer)
  .catch(console.log.bind(console));

function startServer() {
  // Process all further dependencies through Babel.
  require('babel-core/register')(babelConfig);

  // Start server.
  require('./server.js');
}
