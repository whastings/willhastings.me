const config = require('../build');
const glob = require('glob');
const path = require('path');
const shared = require('./shared.config');

module.exports = {
  entry: glob.sync('app/**/__tests__.js')
    .concat(glob.sync('app/**/__tests__/@(*-test|index).js')),

  output: Object.assign({}, shared.output, {
    filename: 'index.js',
    path: path.join(shared.output.path, 'tests')
  }),

  resolve: shared.resolve,

  // Per http://airbnb.io/enzyme/docs/guides/webpack.html
  externals: {
    cheerio: 'window',
    'react/addons': 'ReactAddons',
    'react/lib/ExecutionEnvironment': 'ExecutionEnvironment',
    'react/lib/ReactContext': 'ReactContext',
    sinon: 'sinon'
  },

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
        use: [
          'null-loader'
        ]
      }
    ]
  }
};
