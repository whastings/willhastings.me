import { get } from 'app/utils/apiRequest';

export default function homeRoute(router) {
  router('/', function homeIndex(data, next) {
    if (data.props) {
      return next();
    }

    get('home')
      .then((responseData) => {
        data.props = responseData;
        next();
      });
  });
}
