import AdminIndexPage from 'components/admin/AdminIndexPage';
import HomePage from 'components/home/HomePage';
import ProjectsPage from 'components/projects/ProjectsPage';
import SignInPage from 'components/admin/SignInPage';

const routes = {
  '/': HomePage,
  '/projects': ProjectsPage,
  '/admin': AdminIndexPage,
  '/admin/sign-in': SignInPage
};

export default function componentRouter(route) {
  return routes[route];
}
