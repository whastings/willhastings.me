const asyncRoute = require('server/utils/asyncRoute');
const Session = require('server/modules/session/model');

module.exports = function userLookupMiddleware(db) {
  return asyncRoute(function* userLookup(req, res, next) {
    let sessionCookie = req.signedCookies['session-token'];

    if (!sessionCookie) {
      return next();
    }

    let SessionModel = Session.model,
        user = yield SessionModel.userForToken(sessionCookie);

    if (user) {
      req.currentUser = user.withoutPassword();
    }

    next();
  });
}
