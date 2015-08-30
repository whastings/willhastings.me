// Build assets w/ Broccoli.
var broccoli = require('broccoli'),
    copyDereferenceSync = require('copy-dereference').sync,
    path = require('path'),
    rimraf = require('rimraf'),
    tree = require('./Brocfile.js');

var builder = new broccoli.Builder(tree),
    destination = path.join(__dirname, 'dist');

builder.build()
  .then(function(output) {
    rimraf.sync(destination);
    copyDereferenceSync(output.directory, destination);
    startServer();
  })
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
