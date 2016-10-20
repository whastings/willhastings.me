exports = module.exports = [
  require('./webpack/client.config'),
  require('./webpack/server.config')
];

if (process.env.NODE_ENV === 'production') {
  exports.push(require('./webpack/polyfills.config'));
}
