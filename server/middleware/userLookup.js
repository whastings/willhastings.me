import asyncRoute from 'server/utils/asyncRoute';
import Session from 'server/models/Session';

export default function userLookupMiddleware(db) {
  return asyncRoute(function* userLookup(req, res, next) {
    let sessionCookie = req.signedCookies['session-token'];

    if (!sessionCookie) {
      return next();
    }

    let SessionModel = Session.model,
        user = yield SessionModel.userForToken(sessionCookie);

    if (user) {
      req.user = user.withoutPassword();
    }

    next();
  });
}
