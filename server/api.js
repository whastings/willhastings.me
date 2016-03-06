import homeApi from 'server/modules/home/api';
import postsApi from 'server/modules/posts/api';
import projectsApi from 'server/modules/projects/api';

export default Object.assign(
  {},
  homeApi,
  postsApi,
  projectsApi
);
