import Post from 'server/models/Post';

export default {
  getPosts() {
    return Post.model.findAll()
      .then((posts) => posts.map((post) => post.toJSON()));
  }
};
