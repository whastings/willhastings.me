import analytics from './analytics';
import polyfillLoader from './polyfillLoader';

import 'v2/client/main';

if (process.env.NODE_ENV === 'production') {
  // page(trackRouteTransition);
  // polyfillLoader(start);
  analytics.init();
} else {
  // start();
}

// function start() {
//   // Using require to delay evaluation in case we need to load polyfills first.
//   const App = require('app/index').default;
//   app = new App({
//     renderer: appRenderer,
//     onRedirect: page,
//     onError: errorHandler
//   });
//   App.routes.forEach((route) => page(route, routeToApp.bind(null, route)));
//   page();
// }

function trackRouteTransition(context, next) {
  analytics.track(context.path);
  next();
}
