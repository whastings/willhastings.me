import { ProjectsPage } from './components';
import { loadProjectsPage } from './actions';
import { getPage } from 'pages/selectors';

export default {
  index(req, res, getState) {
    res.dispatch(loadProjectsPage())
      .then(() => res.render(
        ProjectsPage,
        {categories: getPage(getState(), 'projects').categories}
      ))
      .catch(res.handleError);
  }
};
