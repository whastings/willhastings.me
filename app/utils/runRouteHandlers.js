export default function runRouteHandlers(handlers, onError, args, currentHandler = 0) {
  try {
    let result = handlers[currentHandler](...args, function triggerNextHandler() {
      let nextHandler = currentHandler + 1;
      if (nextHandler < handlers.length) {
        runRouteHandlers(handlers, onError, args, nextHandler);
      }
    });

    if (result && typeof result.catch === 'function') {
      result.catch(onError);
    }
  } catch(error) {
    onError(error);
  }
}
