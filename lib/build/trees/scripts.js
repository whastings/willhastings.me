const webpack = require('../plugins/broccoli-webpack');
const webpackConfig = require('../../../config/webpack');

const scripts = 'client/scripts';

const DEFAULT_OPTIONS = {
  useBabel: true
};

module.exports = function scriptsTree(options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  if (!options.useBabel) {
    webpackConfig.module.loaders.splice(0, 1);
  }

  return webpack(scripts, {config: webpackConfig, distDir: 'scripts'});
};
