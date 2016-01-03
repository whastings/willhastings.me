export default function adminRoute(app) {
  app.get('/admin*', function adminRouteAll(req, res, next) {
    // Admin pages are client-side rendered only.
    res.htmlContent = '';
    next();
  });
}
