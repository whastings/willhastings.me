export default function runRouteHandlers(handlers, args, currentHandler = 0) {
  handlers[currentHandler](...args, function triggerNextHandler() {
    let nextHandler = currentHandler + 1;
    if (nextHandler < handlers.length) {
      runRouteHandlers(handlers, args, nextHandler);
    }
  });
}
