import polyfillLoader from './polyfillLoader';
import page from 'page';
import ReactDOM from 'react-dom';

const DEFAULT_PAGE_TITLE = 'Will Hastings';
const rootEl = document.querySelector('.site-main');
let app;

if (process.env.NODE_ENV === 'production') {
  polyfillLoader(start);
} else {
  start();
}

function start() {
  // Using require to delay evaluation in case we need to load polyfills first.
  const App = require('app/index').default;
  app = new App({
    renderer: appRenderer,
    onRedirect: page,
    onError: errorHandler
  });
  App.routes.forEach((route) => page(route, routeToApp.bind(null, route)));
  page();
}

function appRenderer(element, options = {}) {
  ReactDOM.render(element, rootEl);
  document.title = options.title ? `${options.title} - ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
}

function errorHandler(error) {
  console.error && console.error(error);
}

function routeToApp(path, data) {
  app.route(path, data);
}
