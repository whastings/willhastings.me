import asyncRoute from 'lib/asyncRoute';
import Session from 'models/Session';
import User from 'models/User';

export default function sessionsRoute(app) {
  app.post('/api/sessions', asyncRoute(function*(req, res, next) {
    let SessionModel = Session.model,
        UserModel = User.model,
        newSession = req.body,
        sessionUser = newSession.user;

    let user = yield UserModel.findByCredentials(
      sessionUser.username, sessionUser.password
    );

    if (!user) {
      res.status(403).end();
      return;
    }

    let session = yield SessionModel.createForUser(user);
    res.cookie('session-token', session.token, {httpOnly: true, signed: true});
    res.json({user: {id: user.id, username: user.username}});
  }));
}
