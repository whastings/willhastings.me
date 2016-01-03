import Sequelize from 'sequelize';
import Session from 'models/Session';
import User from 'models/User';
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
    Session
  ].forEach((model) => model.initModel(connection));

  return connection.sync()
    .then(() => connection);
}
