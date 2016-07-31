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
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: config.babelNode
      }
    ]
  },
};
