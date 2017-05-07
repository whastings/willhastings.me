const config = require('../build');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const shared = require('./shared.config');
const webpack = require('webpack');

const { CommonsChunkPlugin } = webpack.optimize;
const IS_PROD = process.env.NODE_ENV === 'production';

exports = module.exports = {
  entry: {
    app: [
      './client/scripts/main.js'
    ],
  },

  output: Object.assign(
    {},
    shared.output,
    {
      path: path.join(shared.output.path, 'client'),
    },
    IS_PROD ? {
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].chunk.js',
      publicPath: '/',
    } : {
      publicPath: 'http://localhost:8080/',
    }
  ),

  resolve: shared.resolve,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: config.babelBrowser
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          [
            `css-loader?${IS_PROD ? 'minimize' : '-minimize'}&importLoaders=1`,
          ].concat(IS_PROD ? [
            'postcss-loader'
          ] : [], [
            'sass-loader'
          ])
        ),
      }
    ]
  },

  devtool: 'source-map',

  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: IS_PROD ? 'vendor-[chunkhash].js' : 'vendor.js',
      minChunks(module) {
        return module.context && module.context.includes('node_modules');
      }
    }),
    new CommonsChunkPlugin({
      name: 'app',
      filename: IS_PROD ? 'app-[chunkhash].js' : 'app.js',
      children: true,
      minChunks: 2
    }),
    new CommonsChunkPlugin({
      name: 'manifest',
    }),
    new ExtractTextPlugin({
      filename: IS_PROD ? 'app-[chunkhash].css' : 'app.css',
      allChunks: true
    }),
  ].concat(IS_PROD ? [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ] : [])
};
