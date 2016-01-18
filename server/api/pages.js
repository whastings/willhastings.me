import co from 'co';
import loadHtml from 'server/utils/loadHtml';
import loadJson from 'server/utils/loadJson';
import { flatten } from '@whastings/js_utils/lib/array_utils';

const PAGE_LOADERS = {
  home: co.wrap(function* loadHomePage() {
    return {
      content: (yield loadHtml('pages/home.html')).toString()
    };
  }),

  projects: co.wrap(function* loadProjectsPage() {
    let projectData = yield loadJson('projects.json');

    yield Promise.all(flatten(
      projectData.map((category) => category.projects.map((project) => {
        return loadHtml(`projects/${category.key}/${project.key}.html`)
          .then((content) => project.description = content.toString());
      }))
    ));

    return projectData;
  })
};

export default {
  get(page) {
    let loader = PAGE_LOADERS[page];
    return loader ? loader() : Promise.resolve(null);
  }
};
