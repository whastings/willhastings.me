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

export function loadPost(api, store, dispatchAction, permalink, options = {}) {
  let post = store.getPost(permalink);
  let isEditable = options.editable;
  if (post && post.body && (!isEditable || post.bodyRaw)) {
    return null;
  }
  let queryParams = isEditable ? {editable: isEditable} : undefined;

  return {
    type: 'POST_LOAD',
    payload: {
      promise: api.getPost(permalink, queryParams)
        .then((post) => ({type: 'POST_ADD', payload: post}))
    }
  };
}

export function loadPosts(api, store, dispatchAction, options) {
  return {
    type: 'POSTS_LOAD',
    payload: {
      promise: api.getPosts(options)
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
