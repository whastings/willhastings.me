import HomePage from 'app/components/home/HomePage';
import { loadPage } from 'app/actions/pageActions';

export default function homeRoute(store, dispatchAction, render) {
  dispatchAction(loadPage, 'home')
    .then(() => render(HomePage, store.getState().pages.home))
    .catch(console.log.bind(console));
}
