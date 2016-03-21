var babelRollup = require('rollup-plugin-babel'),
    babelConfig = require('../../config/babel-browser'),
    glob = require('glob'),
    includePaths = require('rollup-plugin-includepaths'),
    mergeTrees = require('broccoli-merge-trees'),
    path = require('path'),
    rollup = require('broccoli-rollup');

var includePathsConfig = {
  paths: [process.cwd()],
  extensions: ['.js', '.jsx'],
  external: [
    'react'
  ]
};

var routeEntryPoints = glob.sync('app/modules/*/routes.js');

var routeTrees = routeEntryPoints.map(function(entryPoint) {
  var directory = path.dirname(entryPoint),
      filename = path.basename(entryPoint);

  return rollup(directory, {
    inputFiles: ['**/*.js', '**/*.jsx'],
    rollup: {
      entry: entryPoint,
      dest: 'scripts/' + filename,
      plugins: [
        includePaths(includePathsConfig),
        babelRollup(babelConfig)
      ]
    }
  });
});

module.exports = mergeTrees(routeTrees);
