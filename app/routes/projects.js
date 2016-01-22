import ProjectsPage from 'app/components/projects/ProjectsPage';
import { loadPage } from 'app/actions/pageActions';

export default function projectsRoute(req, res, store) {
  res.dispatchAction(loadPage, 'projects')
    .then(() => res.render(
      ProjectsPage,
      {categories: store.getState().pages.projects}
    )).catch(console.log.bind(console));
}
