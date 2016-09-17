const formatters = require('./formatters');
const Post = require('./model');

module.exports = {
  getPost(permalink, options) {
    // TODO: Handle post not found.
    return Post.model.findOne({where: {permalink}})
      .then((post) => formatters.post(post, options));
  },

  getPosts({includeUnpublished = false} = {}) {
    let conditions = includeUnpublished ? {} : {published: true};
    return Post.model.findAll({where: conditions})
      .then(formatters.postList);
  }
};
