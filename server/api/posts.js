import Post from 'server/models/Post';

export default {
  getPost(permalink) {
    // TODO: Handle post not found.
    return Post.model.findOne({where: {permalink}})
      .then((post) => post.toJSON());
  },

  getPosts() {
    return Post.model.findAll({
      attributes: {exclude: ['body']}
    })
      .then((posts) => posts.map((post) => post.toJSON()));
  }
};
