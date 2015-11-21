import co from 'co';
import loadHtml from 'lib/loadHtml';
import loadJson from 'lib/loadJson';
import { flatten } from '@whastings/js_utils/lib/array_utils';

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

function loadContent(projectData) {
  let loadPromises = projectData.map((category) => category.projects.map((project) => {
    return loadHtml(`projects/${category.key}/${project.key}.html`)
      .then((content) => project.description = content.toString());
  }));

  return Promise.all(flatten(loadPromises))
    .then(() => projectData);
}

function loadData() {
  return loadJson('projects.json')
    .then((projectData) => loadContent(projectData));
}
