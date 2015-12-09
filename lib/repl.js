var babelConfig = require('../config/babel-node');
require('babel-core/register')(babelConfig);
var initDB = require('../db/initDB').default,
    repl = require('repl'),
    User = require('../models/User');

initDB()
  .then(function(connection) {
    var replServer = repl.start({
      prompt: 'app > '
    });

    replServer.context.connection = connection;
    replServer.context.User = User.default;
  });
