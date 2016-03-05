import { HomePage } from './components';
import { loadPage } from 'app/modules/pages/actions';

export default {
  index(req, res, store) {
    res.dispatchAction(loadPage, 'home')
      .then(() => res.render(HomePage, store.getState().pages.home))
      .catch(console.log.bind(console));
  }
};
