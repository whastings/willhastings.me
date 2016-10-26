import { hideLoader, showLoader } from 'ui/actions';

export function withLoader(routeFn) {
  if (typeof document === 'undefined') {
    return routeFn;
  }

  return function withLoaderCallback(req, res, getState) {
    let routePromise = routeFn(req, res, getState);

    res.dispatch(showLoader());
    routePromise = routePromise.then((value) => {
      res.dispatch(hideLoader());
      return value;
    });

    return routePromise;
  };
}
