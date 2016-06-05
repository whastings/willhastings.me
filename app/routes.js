// Middleware:
import authMiddleware from 'app/middleware/auth';
import currentUserMiddleware from 'app/middleware/currentUser';

// Fake System.import in Node.
if (typeof global !== 'undefined' && typeof System === 'undefined') {
  global.System = {
    import: function(module) {
      return Promise.resolve(require(module));
    }
  };
}

export const PRE_MIDDLEWARE = {
  '/admin*': [currentUserMiddleware, authMiddleware]
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
    loadModule(moduleName)
      .then((module) => module.default)
      .then((module) => module[handler](...arguments))
      .catch((error) => console.log(`Routing error: ${error}`));
  };
}

function loadModule(name) {
  // Has to be a concatenation (not a template string) or webpack won't recognize it.
  return System.import('./modules/' + name + '/routes');
}
