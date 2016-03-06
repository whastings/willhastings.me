import { ProjectsPage } from './components';
import { loadProjectsPage } from './actions';

export default {
  index(req, res, store) {
    res.dispatchAction(loadProjectsPage)
      .then(() => res.render(
        ProjectsPage,
        {categories: store.getState().pages.projects.categories}
      )).catch(console.log.bind(console));
  }
};
