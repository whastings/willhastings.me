import polyfillLoader from './polyfillLoader';
import page from 'page';
import ReactDOM from 'react-dom';

const rootEl = document.querySelector('.site-main');
const noop = function() {};
let app;

if (process.env.NODE_ENV === 'production') {
  polyfillLoader(start);
} else {
  start();
}

function start() {
  // Using require to delay evaluation in case we need to load polyfills first.
  const App = require('app/index').default;
  app = new App(appRenderer, page, errorHandler, noop);
  App.routes.forEach((route) => page(route, routeToApp.bind(null, route)));
  page();
}

function appRenderer(element) {
  ReactDOM.render(element, rootEl);
}

function errorHandler(error) {
  console.error && console.error(error);
}

function routeToApp(path, data) {
  app.route(path, data);
}
