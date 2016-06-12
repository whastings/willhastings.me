const config = require('./build');
const path = require('path');
const webpack = require('webpack');

const { CommonsChunkPlugin } = webpack.optimize;

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve(process.cwd()),
      'node_modules'
    ]
  },

  entry: {
    app: [
      // Relative to client/scripts
      './main.js'
    ],
    vendor: config.vendorModules
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourcePrefix: '  ',
    publicPath: '/scripts/'
  },

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
