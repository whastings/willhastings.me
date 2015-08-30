import co from 'co';
import loadHtml from '../lib/loadHtml';

export default function homeRoute(app) {
  app.get('/', co.wrap(function*(req, res, next) {
    res.reactContent = yield loadHtml('pages/home.html');

    next();
  }));
}
