import Post from 'server/models/Post';
import Sequelize from 'sequelize';
import Session from 'server/models/Session';
import User from 'server/models/User';
import { production as dbConfig } from 'config/db';

export default function initDb() {
  let connection = new Sequelize(
    dbConfig.database, dbConfig.username, dbConfig.password,
    {
      host: dbConfig.host,
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
