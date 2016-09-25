export default function authMiddleware(req, res, getState, next) {
  if (!getState().admin.currentUserId && !/^\/admin\/sign-in/.test(req.path)) {
    res.redirect('/admin/sign-in');
  } else {
    next();
  }
}
