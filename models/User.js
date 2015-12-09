import Sequelize from 'sequelize';

var User = null;

export function create(sequelize) {
  User = sequelize.define('user', {
    username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    passwordDigest: {
      allowNull: false,
      type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });

  module.exports.default = User; // Not sure why this is necessary...

  return User;
}

export default User;
