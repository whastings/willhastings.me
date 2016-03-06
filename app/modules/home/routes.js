import { HomePage } from './components';
import { loadHomePage } from './actions';

export default {
  index(req, res, store) {
    res.dispatchAction(loadHomePage)
      .then(() => res.render(HomePage, store.getState().pages.home))
      .catch(console.log.bind(console));
  }
};
