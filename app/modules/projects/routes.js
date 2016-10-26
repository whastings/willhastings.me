import { ProjectsPage } from './components';
import { loadProjectsPage } from './actions';
import { getPage } from 'pages/selectors';
import { withLoader } from 'app/utils/routeUtils';

export default {
  index: withLoader(function index(req, res, getState) {
    return res.dispatch(loadProjectsPage())
      .then(() => res.render(
        ProjectsPage,
        {categories: getPage(getState(), 'projects').categories}
      ))
      .catch(res.handleError);
  })
};
