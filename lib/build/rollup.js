const babel = require('rollup-plugin-babel');
const config = require('../../config/build');
const glob = require('glob');
const includePaths = require('rollup-plugin-includepaths');
const path = require('path');
const rollup = require('rollup');

const EXTERNAL_MODULES = config.sharedModules.concat(config.vendorModules);
const INCLUDE_PATHS_CONFIG = {
  paths: [process.cwd()],
  extensions: ['.js', '.jsx'],
  external: EXTERNAL_MODULES
};
const BABEL_OPTIONS = Object.assign({
  exclude: 'node_modules/**',
  runtimeHelpers: true
}, config.babelBrowser);

module.exports = function rollup({entryFile, appDir, destDir}) {
  return Promise.all([
    rollupEntry(entryFile, destDir),
    rollupModules(appDir, destDir)
  ]);
};

function rollupEntry(entryFile, destDir) {
  let dest = path.join(destDir, path.basename(entryFile));
  return runRollup(entryFile, dest);
}

function rollupModules(appDir, destDir) {
  let moduleEntryPoints = glob.sync('modules/*/routes.js', {cwd: appDir});

  return Promise.all(moduleEntryPoints.map(
    (entryPoint) => runRollup(
      path.join(appDir, entryPoint),
      path.join(destDir, entryPoint)
    )
  ));
}

function runRollup(entryFile, destFile) {
  return rollup.rollup({
    entry: entryFile,
    external: EXTERNAL_MODULES,
    plugins: [
      babel(BABEL_OPTIONS),
      includePaths(INCLUDE_PATHS_CONFIG)
    ]
  })
    .then((bundle) => bundle.write({dest: destFile}));
}
