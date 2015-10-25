import co from 'co';
import loadHtml from '../lib/loadHtml';

export default function homeRoute(app) {
  app.get('/', co.wrap(function*(req, res, next) {
    res.reactProps = {
      content: (yield loadHtml('pages/home.html')).toString()
    };
    res.initData = {content: '#home-page-content'};
    res.routePath = req.route.path;

    next();
  }));
}
