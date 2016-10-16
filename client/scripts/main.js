import polyfillLoader from './polyfillLoader';
import App from 'app/index';
import page from 'page';
import ReactDOM from 'react-dom';

const rootEl = document.querySelector('.site-main');
let app;

if (process.env.NODE_ENV === 'production') {
  polyfillLoader(start);
} else {
  start();
}

function start() {
  app = new App(appRenderer, page, errorHandler);
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
