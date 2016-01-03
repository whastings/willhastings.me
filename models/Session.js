import co from 'co';
import Sequelize from 'sequelize';
import uid from 'uid-safe';
import User from 'models/User';

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
      return session.user;
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
  return uid(18);
}

export default Session;
