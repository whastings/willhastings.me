// Routes:
import adminRoutes from 'app/modules/admin/routes';
import blogRoutes from 'app/modules/blog/routes';
import homeRoutes from 'app/modules/home/routes';
import projectsRoutes from 'app/modules/projects/routes';

// Middleware:
import authMiddleware from 'app/middleware/auth';
import currentUserMiddleware from 'app/middleware/currentUser';

export const PRE_MIDDLEWARE = {
  '/admin*': [currentUserMiddleware, authMiddleware]
};

export const ROUTES = {
  '/': homeRoutes.index,
  '/projects': projectsRoutes.index,
  '/blog': blogRoutes.index,
  '/blog/:post': blogRoutes.view,
  '/admin': adminRoutes.index,
  '/admin/sign-in': adminRoutes.signIn,
  '/admin/posts/new': adminRoutes.newPost,
  '/admin/posts/:post/edit': adminRoutes.editPost
};
