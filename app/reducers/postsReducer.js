import createReducer from 'app/utils/createReducer';

export default createReducer({
  POST_ADD: function addPost(state, action) {
    let post = action.payload;
    return state.merge({
      [post.id]: post
    });
  },

  POSTS_ADD: function addPosts(state, action) {
    return state.merge(
      action.payload.reduce((posts, post) => {
        posts[post.id] = post;
        return posts;
      }, {})
    );
  }
});
