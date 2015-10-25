import co from 'co';
import loadJson from '../lib/loadJson';

export default function projectsRoute(app) {
  app.get('/projects', co.wrap(function*(req, res, next) {
    res.reactProps = {
      categories: yield loadJson('projects.json')
    };
    res.routePath = req.route.path;

    next();
  }));
}
