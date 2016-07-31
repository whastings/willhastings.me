const bcrypt = require('bcrypt');
const co = require('co');
const denodeify = require('denodeify');
const Sequelize = require('sequelize');

const SALT_ROUNDS = 10;

const compareHash = denodeify(bcrypt.compare),
      genSalt = denodeify(bcrypt.genSalt),
      hash = denodeify(bcrypt.hash);

const schema = {
  username: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  passwordDigest: {
    allowNull: false,
    type: Sequelize.STRING
  }
};

const methods = {
  classMethods: {
    createWithPassword: co.wrap(function* createWithPassword(username, password, options = {}) {
      let newUser = this.build({username});
      yield newUser.setPassword(password);
      yield newUser.save(options);
      return newUser;
    }),

    findByCredentials: co.wrap(function* findByCredentials(username, password) {
      let user = yield this.findOne({where: {username}});

      if (!user) {
        return null;
      }

      let isPassword = yield user.checkPassword(password);

      return isPassword ? user : null;
    })
  },

  instanceMethods: {
    checkPassword(password) {
      return compareHash(password, this.passwordDigest);
    },

    setPassword: co.wrap(function* setPassword(password) {
      let salt = yield genSalt(SALT_ROUNDS),
          hashedPassword = yield hash(password, salt);

      this.passwordDigest = hashedPassword;
    }),

    withoutPassword() {
      let plainUser = this.toJSON();
      delete plainUser.passwordDigest;
      return plainUser;
    }
  }
};

const User = {
  model: null,

  initModel(sequelize) {
    User.model = sequelize.define('user', schema, methods);
    return User.model;
  }
};

module.exports = User;
