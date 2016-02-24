var path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'client/scripts/main.js'),
  output: {
    filename: 'scripts/main.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
          plugins: [
            'check-es2015-constants',
            'transform-decorators-legacy',
            'transform-es2015-block-scoped-functions',
            'transform-es2015-block-scoping',
            'transform-es2015-classes',
            'transform-es2015-destructuring',
            'transform-es2015-literals',
            'transform-es2015-modules-commonjs',
            'transform-es2015-object-super',
            'transform-es2015-parameters',
            'transform-es2015-sticky-regex',
            'transform-es2015-typeof-symbol',
            'transform-es2015-unicode-regex',
            'transform-object-rest-spread',
            'transform-regenerator'
          ],
          presets: ['react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname, '../')
  },
  devtool: 'source-map'
};
