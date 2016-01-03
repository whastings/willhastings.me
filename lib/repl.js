var babelConfig = require('../config/babel-node');
require('babel-core/register')(babelConfig);
var initDB = require('../db/initDB').default,
    repl = require('repl'),
    Session = require('../models/Session');
    User = require('../models/User');

initDB()
  .then(function(connection) {
    var replServer = repl.start({
      prompt: 'app > '
    });

    replServer.context.connection = connection;
    replServer.context.User = User.default.model;
    replServer.context.Session = Session.default.model;
  });
