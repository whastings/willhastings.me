const co = require('co');

module.exports = function asyncRoute(handler) {
  handler = co.wrap(handler);
  return function runAsyncRoute(req, res, next) {
    handler(req, res, next)
      .catch((error) => {
        console.log('Async route error: ', error);
        console.log('Stack: ', error.stack);
        res.status(500).end();
      });
  };
};
