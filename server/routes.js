const app = require('server/modules/appRouter');
const home = require('server/modules/home');
const posts = require('server/modules/posts');
const projects = require('server/modules/projects');
const rss = require('server/modules/posts/rss');
const session = require('server/modules/session');

module.exports = {
  '/api/pages/home': home,
  '/api/pages/projects': projects,
  '/api/posts': posts,
  '/api/session': session,
  '/rss': rss,
  '/': app
};
