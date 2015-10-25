import co from 'co';
import loadHtml from '../lib/loadHtml';

export default function homeRoute(app) {
  app.get('/', co.wrap(function*(req, res, next) {
    res.reactProps = {
      content: (yield getHomeHtml()).toString()
    };
    res.initData = {content: '#home-page-content'};
    res.routePath = req.route.path;

    next();
  }));

  app.get('/api/home', co.wrap(function*(req, res, next) {
    res.json({
      content: (yield getHomeHtml()).toString()
    });
  }));
}

function getHomeHtml() {
  return loadHtml('pages/home.html');
}
