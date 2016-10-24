const CWD = process.cwd();
const path = require('path');

module.exports = {
  output: {
    path: path.join(CWD, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    sourcePrefix: '  ',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(CWD),
      path.join(CWD, 'app/modules'),
      'node_modules'
    ]
  },
};
