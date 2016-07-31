const config = require('../build');
const path = require('path');
const shared = require('./shared.config');
const webpack = require('webpack');

const { CommonsChunkPlugin } = webpack.optimize;

module.exports = {
  entry: {
    app: [
      './client/scripts/main.js'
    ],
    vendor: config.vendorModules
  },

  output: Object.assign({}, shared.output, {
    path: path.join(shared.output.path, 'client/scripts'),
    publicPath: '/scripts/'
  }),

  resolve: shared.resolve,

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: config.babelBrowser
      }
    ]
  },

  //devtool: 'source-map',

  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: 'app',
      filename: 'app.js',
      children: true,
      minChunks: 2
    })
  ]
};
