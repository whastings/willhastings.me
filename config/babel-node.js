var babelResolver = require('babel-resolver'),
    path = require('path');

module.exports = {
  ignore: /node_modules\/(?!@whastings\/js_utils)/,
  plugins: [
    'transform-object-rest-spread'
  ],
  presets: ['react', 'es2015-node'],
  resolveModuleSource: babelResolver(path.resolve(__dirname, '../'))
};
