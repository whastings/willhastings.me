const co = require('co');
const Sequelize = require('sequelize');
const uid = require('uid-safe');
const User = require('server/modules/users/model');

const schema = {
  token: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  }
};

const methods = {
  classMethods: {
    createForUser: co.wrap(function* createForUser(user) {
      let token = yield generateToken();
      return this.create({token, userId: user.id});
    }),

    userForToken: co.wrap(function* userForToken(token) {
      let session = yield this.findOne({where: {token}, include: [User.model]});
      return session ? session.user : null;
    })
  }
};

const Session = {
  model: null,

  initModel(sequelize) {
    Session.model = sequelize.define('session', schema, methods);
    Session.model.belongsTo(User.model);
  }
};

function generateToken() {
  return uid(18)
    .then((token) => `sess-token-${token}`);
}

module.exports = Session;
