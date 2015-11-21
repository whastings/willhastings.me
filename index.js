var babelResolver = require('babel-resolver'),
    builder = require('./lib/builder'),
    path = require('path');

// Run initial build.
builder.build(path.join(__dirname, 'dist'))
  .then(startServer)
  .catch(console.log.bind(console));

function startServer() {
  // Process all further dependencies through Babel.
  require('babel-core/register')({
    ignore: /node_modules\/(?!@whastings\/js_utils)/,
    presets: ['react', 'es2015-node5'],
    resolveModuleSource: babelResolver(__dirname)
  });

  // Start server.
  require('./server.js');
}
