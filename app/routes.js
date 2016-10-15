// Middleware:
import authMiddleware from 'app/middleware/auth';
import currentUserMiddleware from 'app/middleware/currentUser';

export const PRE_MIDDLEWARE = {
  '/admin*': [currentUserMiddleware, authMiddleware],
  '/blog/:post': [currentUserMiddleware]
};

export const ROUTES = {
  '/': createRunner('home', 'index'),
  '/projects': createRunner('projects', 'index'),
  '/blog': createRunner('blog', 'index'),
  '/blog/:post': createRunner('blog', 'view'),
  '/admin': createRunner('admin', 'index'),
  '/admin/sign-in': createRunner('admin', 'signIn'),
  '/admin/posts/new': createRunner('admin', 'newPost'),
  '/admin/posts/:post/edit': createRunner('admin', 'editPost')
};

function createRunner(moduleName, handler) {
  return function routeRunner() {
    return loadModule(moduleName)
      .then((module) => module.default)
      .then((module) => module[handler](...arguments));
  };
}

function loadModule(name) {
  // WEBPACK SPLIT POINT:
  // Has to be a concatenation (not a template string) or webpack won't recognize it.
  return (typeof System !== 'undefined') ?
    System.import('./modules/' + name + '/routes') :
    Promise.resolve(require(`./modules/${name}/routes`));
}
