import co from 'co';
import HomePage from '../components/pages/HomePage';
import loadHtml from '../lib/loadHtml';

export default function homeRoute(app) {
  app.get('/', co.wrap(function*(req, res, next) {
    res.reactData = {
      component: HomePage,
      content: yield loadHtml('pages/home.html')
    }

    next();
  }));
}
