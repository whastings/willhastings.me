const merge = require('broccoli-merge-trees');
const webpack = require('../plugins/broccoli-webpack');
const webpackConfig = require('../../../config/webpack');

const app = 'app'; // We'll pass this so it's watched too.
const scripts = 'client/scripts';

const DEFAULT_OPTIONS = {
  useBabel: true
};

module.exports = function scriptsTree(options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  if (!options.useBabel) {
    webpackConfig.module.loaders.splice(0, 1);
  }

  return webpack(merge([scripts, app]), {config: webpackConfig, distDir: 'scripts'});
};
