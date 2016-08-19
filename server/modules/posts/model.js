const Sequelize = require('sequelize');
const slug = require('slug');
const User = require('server/modules/users/model');
const { toDateOnly } = require('server/utils/dates');

const SLUG_OPTIONS = {
  lower: true
};

const schema = {
  title: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },

  body: {
    allowNull: false,
    type: Sequelize.TEXT
  },

  permalink: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },

  published: {
    allowNull: false,
    defaultValue: false,
    type: Sequelize.BOOLEAN
  },

  publishDate: {
    type: Sequelize.DATEONLY
  }
};

const methods = {
  classMethods: {
    findByPermalink(permalink) {
      return this.findOne({where: {permalink}});
    }
  },

  hooks: {
    beforeCreate(post) {
      maybeAddPublishDate(post);
    },

    beforeUpdate(post) {
      maybeAddPublishDate(post);
    },

    beforeValidate(post) {
      post.permalink = slug(post.title, SLUG_OPTIONS);
    }
  }
};

const Post = {
  model: null,

  initModel(sequelize) {
    Post.model = sequelize.define('post', schema, methods);
    Post.model.belongsTo(User.model);
  }
};

module.exports = Post;

function maybeAddPublishDate(post) {
  if (post.published && !post.publishDate) {
    post.publishDate = toDateOnly(new Date());
  }
}
