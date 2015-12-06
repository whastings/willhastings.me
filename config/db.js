var env = process.env;

module.exports = {
  production: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_USER,
    host: env.POSTGRES_PORT_5432_TCP_ADDR,
    dialect: 'postgres'
  }
};
