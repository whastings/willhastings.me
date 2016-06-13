require('./initEnv')();
const initDB = require('../server/db/initDB').default;
const Post = require('../server/modules/posts/model').default;
const repl = require('repl');
const Session = require('../server/modules/session/model').default;
const User = require('../server/modules/users/model').default;

initDB()
  .then((connection) => {
    let replServer = repl.start({
      prompt: 'app > '
    });

    replServer.context.connection = connection;
    replServer.context.User = User.model;
    replServer.context.Session = Session.model;
    replServer.context.Post = Post.model;
  });
