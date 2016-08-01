require('dotenv').config();
const initDB = require('server/db/initDB');
const Post = require('server/modules/posts/model');
const repl = require('repl');
const Session = require('server/modules/session/model');
const User = require('server/modules/users/model');

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
