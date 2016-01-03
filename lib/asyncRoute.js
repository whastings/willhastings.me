import co from 'co';

export default function asyncRoute(handler) {
  handler = co.wrap(handler);
  return function runAsyncRoute(req, res, next) {
    handler(req, res, next)
      .catch((error) => {
        console.log('Async route error: ', error);
        res.status(500).end();
      });
  };
}
