export default function runRouteHandlers(handlers, onError, onWillRender, args, currentHandler = 0) {
  const isLastHandler = currentHandler === (handlers.length - 1);
  try {
    if (isLastHandler && onWillRender) {
      onWillRender();
    }
    const result = handlers[currentHandler](...args, function triggerNextHandler() {
      if (!isLastHandler) {
        runRouteHandlers(handlers, onError, onWillRender, args, currentHandler + 1);
      }
    });

    if (result && typeof result.catch === 'function') {
      result.catch(onError);
    }
  } catch (error) {
    onError(error);
  }
}
