import asyncRoute from 'server/utils/asyncRoute';
import express from 'express';
import Session from './model';
import User from 'server/modules/users/model';

const app = express();

app.post('/', asyncRoute(function* (req, res, next) {
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
  res.json({user: user.withoutPassword()});
}));

app.delete('/', asyncRoute(function* (req, res) {
  let token = req.signedCookies['session-token'],
      session = token ? yield Session.model.findOne({where: {token}}) : null;

  if (token) {
    res.clearCookie('session-token');
  }

  if (session) {
    yield session.destroy();
  }

  res.end();
}));

export default app;
