export default function authMiddleware(req, res, next) {
  if (!req.currentUser) {
    res.status(401).end();
    return;
  }

  next();
}
