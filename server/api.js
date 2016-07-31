const homeApi = require('server/modules/home/api');
const postsApi = require('server/modules/posts/api');
const projectsApi = require('server/modules/projects/api');

module.exports = Object.assign(
  {},
  homeApi,
  postsApi,
  projectsApi
);
