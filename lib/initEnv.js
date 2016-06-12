const babelConfig = require('../config/babel-node');
const dotenv = require('dotenv');

module.exports = function initEnv() {
  require('babel-core/register')(babelConfig);
  dotenv.config();
};
