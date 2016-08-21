const formatters = require('./formatters');
const Post = require('./model');

module.exports = {
  getPost(permalink) {
    // TODO: Handle post not found.
    return Post.model.findOne({where: {permalink}})
      .then(formatters.post);
  },

  getPosts() {
    return Post.model.findAll()
      .then(formatters.postList);
  }
};
