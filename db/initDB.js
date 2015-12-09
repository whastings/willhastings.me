import Sequelize from 'sequelize';
import { production as dbConfig } from '../config/db';
import { create as createUser } from '../models/User';

export default function initDb() {
  let connection = new Sequelize(
    dbConfig.database, dbConfig.username, dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect
    }
  );

  [createUser].forEach((createFn) => createFn(connection));

  return connection.sync()
    .then(() => connection);
}
