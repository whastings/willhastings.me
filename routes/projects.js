import co from 'co';
import loadJson from '../lib/loadJson';

export default function projectsRoute(app) {
  app.get('/projects', co.wrap(function*(req, res, next) {
    res.reactProps = {
      categories: yield loadData()
    };
    res.routePath = req.route.path;

    next();
  }));

  app.get('/api/projects', co.wrap(function*(req, res) {
    res.json({
      categories: yield loadData()
    });
  }));
}

function loadData() {
  return loadJson('projects.json');
}
