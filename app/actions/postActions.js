export function loadPosts(api, store, dispatchAction) {
  return {
    type: 'POSTS_LOAD',
    payload: {
      promise: api.getPosts()
        .then((posts) => ({type: 'POSTS_ADD', payload: posts}))
    }
  };
}
