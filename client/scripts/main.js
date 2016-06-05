import App from 'app/index';
import page from 'page';
import ReactDOM from 'react-dom';

const rootEl = document.querySelector('.site-main'),
      app = new App(appRenderer, page);

App.routes.forEach((route) => page(route, routeToApp.bind(null, route)));
page();

function appRenderer(element) {
  ReactDOM.render(element, rootEl);
}

function routeToApp(path, data) {
  app.route(path, data);
}
