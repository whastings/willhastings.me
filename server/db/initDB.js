import Post from 'server/modules/posts/model';
import Sequelize from 'sequelize';
import Session from 'server/modules/session/model';
import User from 'server/modules/users/model';
import { production as dbConfig } from 'config/db';

export default function initDb() {
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
}
