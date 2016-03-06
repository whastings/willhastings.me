import app from 'server/modules/appRouter';
import home from 'server/modules/home';
import posts from 'server/modules/posts';
import projects from 'server/modules/projects';
import session from 'server/modules/session';

export default {
  '/': app,
  '/api/pages/home': home,
  '/api/pages/projects': projects,
  '/api/posts': posts,
  '/api/session': session
};
