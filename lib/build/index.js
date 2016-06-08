const Builder = require('./Builder');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

// Broccoli trees:
const htmlTree = require('./trees/html');
const stylesTree = require('./trees/styles');

const CWD = process.cwd();

exports = module.exports = function build(options = {}) {
  let builder = getBuilder(options);
  return builder.run();
};

exports.getBuilder = getBuilder;

function getBuilder(options) {
  return new Builder(
    mergeTrees([htmlTree, stylesTree]),
    Object.assign({
      appDir: path.join(CWD, 'app'),
      clientEntry: path.join(CWD, 'client/scripts/main.js'),
      disableRollup: true,
      distDir: path.join(CWD, 'dist'),
      tmpDir: path.join(CWD, 'tmp')
    }, options)
  );
}
