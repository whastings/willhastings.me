const CachingWriter = require('broccoli-caching-writer');
const path = require('path');
const webpack = require('webpack');

/**
 * Based on:
 * - https://github.com/rafales/broccoli-webpack-fast
 * - https://github.com/myfreeweb/broccoli-webpack
 */
class BroccoliWebpackWriter extends CachingWriter {
  constructor(inputNode, options) {
    super([inputNode], options);
    this.options = options;
    this.config = null;
  }

  build() {
    let config = this._getConfig();
    let compiler = webpack(config);

    return new Promise((resolve, reject) => {
      compiler.run((error, stats) => {
        let { errors, warnings } = stats.toJson();
        errors.forEach(console.error.bind(console));
        warnings.forEach(console.warn.bind(console));

        if (error || errors.length > 0) {
          reject(error || errors);
        } else {
          resolve();
        }
      });
    });
  }

  _getConfig() {
    if (this.config) {
      return this.config;
    }

    let { distDir } = this.options;
    let config = this.config = Object.assign({}, this.options.config);

    Object.assign({}, config.output || {});
    config.output.path = path.join(this.outputPath, distDir || '');

    config.context = this.inputPaths[0];

    return config;
  }
}

module.exports = function webpack(inputNodes, options) {
  return new BroccoliWebpackWriter(inputNodes, options);
}
