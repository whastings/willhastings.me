const Post = require('server/modules/posts/model');
const Sequelize = require('sequelize');
const Session = require('server/modules/session/model');
const User = require('server/modules/users/model');
const { production: dbConfig } = require('config/db');

module.exports = function initDb() {
  let connection = new Sequelize(
    dbConfig.database, dbConfig.username, dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect
    }
  );

  [
    User,
    Session,
    Post
  ].forEach((model) => model.initModel(connection));

  return connection.sync()
    .then(() => connection);
};
