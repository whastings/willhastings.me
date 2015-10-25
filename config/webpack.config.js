var path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'app/app.js'),
  output: {
    filename: 'app/app.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
          blacklist: [
            'es6.arrowFunctions',
            'es6.forOf',
            'es6.properties.computed',
            'es6.properties.shorthand',
            'es6.spread',
            'es6.templateLiterals'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map'
};
