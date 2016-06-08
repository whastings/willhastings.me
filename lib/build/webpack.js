const config = require('../../config/build');
const path = require('path');
const webpack = require('webpack');

const { CommonsChunkPlugin } = webpack.optimize;

const BABEL_LOADER = {
  loader: 'babel-loader',
  test: /\.jsx?$/,
  exclude: /node_modules/,
  query: config.babelBrowser
};

module.exports = function runWebpack(options) {
  let compiler = webpack(getConfig(options));

  return new Promise(function(resolve, reject) {
    compiler.run(function(error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

function getConfig({entryFile, destDir, useBabel}) {
  let loaders = [];

  if (useBabel) {
    loaders.push(BABEL_LOADER);
  }

  return {
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modules: [
        path.resolve(process.cwd()),
        'node_modules'
      ]
    },
    entry: {
      app: [
        entryFile
      ],
      vendor: config.vendorModules
    },
    output: {
      path: destDir,
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      sourcePrefix: '  ',
      publicPath: '/scripts/'
    },
    module: {
      loaders
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
}
