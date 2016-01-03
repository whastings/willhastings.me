import { get } from 'app/utils/apiRequest';

export default function projectsRoute(router) {
  router('/projects', function projectsIndex(data, next) {
    if (data.props) {
      return next();
    }

    get('projects')
      .then((responseData) => {
        data.props = responseData;
        next();
      });
  });
}
