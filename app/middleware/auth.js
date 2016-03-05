export default function authMiddleware(req, res, store, next) {
  let state = store.getState();

  if (!state.admin.currentUserId && !/^\/admin\/sign-in/.test(req.path)) {
    res.redirect('/admin/sign-in');
  } else {
    next();
  }
}
