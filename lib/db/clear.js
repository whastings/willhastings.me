require('lib/env');
const initDB = require('server/db/initDB');

initDB().then((connection) => {
  return connection.drop();
});
