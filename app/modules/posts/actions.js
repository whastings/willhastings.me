export function createPost(api, store, dispatchAction, postData) {
  return {
    type: 'POST_CREATE',
    payload: {
      promise: api.createPost(postData)
        .then((post) => ({type: 'POST_ADD', payload: post}))
    }
  };
}

export function deletePost(api, store, dispatchAction, post) {
  return {
    type: 'POST_DELETE',
    payload: {
      promise: api.deletePost(post.id)
        .then(() => ({type: 'POST_REMOVE', payload: post.id}))
    }
  };
}

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

export function updatePost(api, store, dispatchAction, postData) {
  return {
    type: 'POST_SAVE',
    payload: {
      promise: api.savePost(postData)
        .then((post) => ({type: 'POST_UPDATE', payload: post}))
    }
  };
}
