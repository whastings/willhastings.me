import createReducer from 'app/utils/createReducer';

export default createReducer({
  POSTS_ADD: function addPosts(state, action) {
    return state.merge(
      action.payload.reduce((posts, post) => {
        posts[post.id] = post;
        return posts;
      }, {})
    );
  }
});
