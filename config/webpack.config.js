const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = [
  require('./webpack/server.config'),
].concat(IS_PROD ? [
  require('./webpack/client.config'),
  require('./webpack/polyfills.config'),
] : [
  require('./webpack/tests.config'),
]);
