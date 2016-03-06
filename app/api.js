import adminApi from 'app/modules/admin/api';
import homeApi from 'app/modules/home/api';
import postsApi from 'app/modules/posts/api';
import projectsApi from 'app/modules/projects/api';

export default Object.assign(
  {},
  adminApi,
  homeApi,
  postsApi,
  projectsApi
);
