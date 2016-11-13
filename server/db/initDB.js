const Post = require('server/modules/posts/model');
const Sequelize = require('sequelize');
const Session = require('server/modules/session/model');
const User = require('server/modules/users/model');
const dbConfig = require('config/db');

const REDACTED_PATTERNS = [
  /sess-token-[^'",\s]+/
];

module.exports = function initDb() {
  let connection = new Sequelize(
    dbConfig.url,
    {
      dialect: dbConfig.dialect,
      logging: logQuery
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

function logQuery(query) {
  let redactedQuery = REDACTED_PATTERNS.reduce((query, pattern) => query.replace(pattern, '[REDACTED]'), query);
  console.log(redactedQuery);
}
