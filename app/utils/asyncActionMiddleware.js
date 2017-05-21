export default function asyncActionMiddleware(...actionResources) {
  return (store) => (next) => (action) => {
    if (typeof action !== 'function') {
      return next(action);
    }

    let { dispatch, getState } = store;
    let actionResult = action(...actionResources, getState, dispatch);

    if (actionResult) {
      if (typeof actionResult.then === 'function') {
        return actionResult.then((promiseResult) => {
          if (promiseResult) {
            dispatch(promiseResult);
          }
          return promiseResult;
        });
      }

      return Promise.resolve(next(actionResult));
    }

    return Promise.resolve();
  };
}
