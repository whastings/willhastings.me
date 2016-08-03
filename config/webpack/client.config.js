const config = require('../build');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const shared = require('./shared.config');
const webpack = require('webpack');

const CWD = process.cwd();
const { CommonsChunkPlugin } = webpack.optimize;

module.exports = {
  entry: {
    app: [
      './client/scripts/main.js'
    ],
    vendor: config.vendorModules
  },

  output: Object.assign({}, shared.output, {
    path: path.join(shared.output.path, 'client'),
    publicPath: '/'
  }),

  resolve: shared.resolve,

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: config.babelBrowser,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      }
    ]
  },

  devtool: 'source-map',

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
    }),
    new ExtractTextPlugin({filename: 'app.css', allChunks: true}),
  ]
};
