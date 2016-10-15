const co = require('co');

module.exports = function asyncRoute(handler) {
  handler = co.wrap(handler);
  return function runAsyncRoute(req, res, next) {
    handler(req, res, next).catch(next);
  };
};
