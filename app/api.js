import adminApi from 'app/modules/admin/api';
import pagesApi from 'app/modules/pages/api';
import postsApi from 'app/modules/posts/api';

export default Object.assign(
  {},
  adminApi,
  pagesApi,
  postsApi
);
