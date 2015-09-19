var builder = require('./lib/builder'),
    path = require('path');

// Run initial build.
builder.build(path.join(__dirname, 'dist'))
  .then(startServer)
  .catch(console.log.bind(console));

function startServer() {
  // Process all further dependencies through Babel.
  require('babel/register')({
    blacklist: [
      'regenerator',
      'es6.blockScoping',
      'es6.constants',
      'es6.templateLiterals'
    ]
  });

  // Start server.
  require('./server.js');
}
