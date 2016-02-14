export function loadPost(api, store, dispatchAction, permalink) {
  let post = store.getPost(permalink);
  if (post && post.body) {
    return null;
  }

  return {
    type: 'POST_LOAD',
    payload: {
      promise: api.getPost(permalink)
        .then((post) => ({type: 'POST_ADD', payload: post}))
    }
  };
}

export function loadPosts(api, store, dispatchAction) {
  if (store.getPosts().length) {
    return null;
  }

  return {
    type: 'POSTS_LOAD',
    payload: {
      promise: api.getPosts()
        .then((posts) => ({type: 'POSTS_ADD', payload: posts}))
    }
  };
}
