// Build assets w/ Broccoli.
var broccoli = require('broccoli'),
    copyDereferenceSync = require('copy-dereference').sync,
    rimraf = require('rimraf'),
    tree = require('../Brocfile'),
    Watcher = require('broccoli/lib/watcher');

var builder = new broccoli.Builder(tree);

exports.build = function build(destination) {
  var writer = writeOutput.bind(null, destination);

  return builder.build()
    .then(writer);
};

exports.watcher = function watcher() {
  return new Watcher(builder, {
    interval: 500
  });
};

function writeOutput(destination, output) {
  rimraf.sync(destination);
  copyDereferenceSync(output.directory, destination);
  console.log('Broccoli build complete.\n');
}
