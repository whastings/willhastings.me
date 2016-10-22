const path = require('path');
const shared = require('./shared.config');
const webpack = require('webpack');

module.exports = {
  entry: './client/scripts/polyfills.js',
  output: {
    path: path.join(shared.output.path, 'client'),
    filename: 'polyfills.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  node: {
    global: false,
    process: false,
    Buffer: false,
    setImmediate: false
  }
};
