import { ProjectsPage } from './components';
import { loadPage } from 'app/modules/pages/actions';

export default {
  index(req, res, store) {
    res.dispatchAction(loadPage, 'projects')
      .then(() => res.render(
        ProjectsPage,
        {categories: store.getState().pages.projects}
      )).catch(console.log.bind(console));
  }
};
