import page from 'page';
import ReactDOM from 'react-dom';

import App from 'v2/app/App';

const app = new App();
const rootEl = document.querySelector('.site-main');

App.getRoutes().forEach((routeInfo) => {
  page(routeInfo.path, runRoute.bind(null, routeInfo));
});
page();

function runRoute(routeInfo, context) {
  const routeActions = {
    redirect: page,
  };

  app.runRoute(routeInfo, context, routeActions)
    .then((element) => {
      if (element) {
        ReactDOM.render(element, rootEl);
      }
    })
    .catch((error) => console.error && console.error(error));
}
