import ProjectsPage from 'app/components/projects/ProjectsPage';
import { loadPage } from 'app/actions/pageActions';

export default function projectsRoute(store, dispatchAction, render) {
  dispatchAction(loadPage, 'projects')
    .then(() => render(
      ProjectsPage,
      {categories: store.getState().pages.projects}
    )).catch(console.log.bind(console));
}
