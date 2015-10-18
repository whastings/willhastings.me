import HomePage from '../components/home/HomePage';
import ProjectsPage from '../components/projects/ProjectsPage';

const routes = {
  '/': HomePage,
  '/projects': ProjectsPage
};

export default function componentRouter(route) {
  return routes[route];
}
