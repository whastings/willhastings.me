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
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: config.babelNode
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'null-loader'
        ]
      }
    ]
  },
};
