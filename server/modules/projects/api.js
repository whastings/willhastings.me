const co = require('co');
const loadHtml = require('server/utils/loadHtml');
const loadJson = require('server/utils/loadJson');
const { flatten } = require('@whastings/js_utils');

module.exports = {
  getProjectsPage: co.wrap(function* loadProjectsPage() {
    let projectData = yield loadJson('projects.json');

    yield Promise.all(flatten(
      projectData.map((category) => category.projects.map((project) => {
        return loadHtml(`projects/${category.key}/${project.key}.html`)
          .then((content) => project.description = content.toString());
      }))
    ));

    return {categories: projectData, id: 'projects'};
  })
};
