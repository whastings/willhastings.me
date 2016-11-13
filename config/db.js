const env = process.env;

module.exports = {
  url: env.DATABASE_URL,
  dialect: 'postgres'
};
