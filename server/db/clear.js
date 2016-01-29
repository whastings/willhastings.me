import initDB from 'server/db/initDB';

initDB().then((connection) => {
  return connection.drop();
});
