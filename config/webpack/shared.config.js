const CWD = process.cwd();
const path = require('path');

module.exports = {
  output: {
    path: path.join(CWD, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourcePrefix: '  ',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve(CWD),
      'node_modules'
    ]
  },
};
