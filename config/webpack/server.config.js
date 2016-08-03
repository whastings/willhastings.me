const config = require('../build');
const path = require('path');
const shared = require('./shared.config');

module.exports = {
  entry: {
    app: './app/index.jsx'
  },

  output: Object.assign({}, shared.output, {
    path: path.join(shared.output.path, 'server'),
    library: 'app',
    libraryTarget: 'commonjs2'
  }),

  resolve: shared.resolve,
  target: 'node',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: config.babelNode
      },
      {
        test: /\.scss$/,
        loader: 'null-loader'
      }
    ]
  },
};
