import HomePage from 'app/components/home/HomePage';
import { loadPage } from 'app/actions/pageActions';

export default function homeRoute(req, res, store) {
  res.dispatchAction(loadPage, 'home')
    .then(() => res.render(HomePage, store.getState().pages.home))
    .catch(console.log.bind(console));
}
