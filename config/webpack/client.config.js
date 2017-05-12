const config = require('../build');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const shared = require('./shared.config');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const { CommonsChunkPlugin } = webpack.optimize;
const CWD = process.cwd();
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
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.SHOULD_PROFILE': JSON.stringify(IS_PROD && !!process.env.SHOULD_PROFILE),
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        /* eslint-disable camelcase */
        keep_fnames: true,
        /* eslint-enable camelcase */
      },
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: `${CWD}/dist/client`,
      prettyPrint: true,
    }),
  ] : [])
};
