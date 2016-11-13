import { getPost } from './selectors';

export function createPost(postData) {
  return (api) =>
    api.createPost(postData)
      .then((post) => ({type: 'POST_ADD', payload: post}));
}

export function deletePost(post) {
  return (api) =>
    api.deletePost(post.id)
      .then(() => ({type: 'POST_REMOVE', payload: post.id}));
}

export function loadPost(permalink, options = {}) {
  return (api, getState) => {
    let post = getPost(getState(), permalink);
    let isEditable = options.editable;
    if (post && post.body && (!isEditable || post.bodyRaw)) {
      return null;
    }
    let queryParams = isEditable ? {editable: isEditable} : undefined;

    return api.getPost(permalink, queryParams)
      .then((post) => {
        if (!post || (!post.published && !getState().admin.currentUserId)) {
          return null;
        }

        return {type: 'POST_ADD', payload: post};
      });
  };
}

export function loadPosts(options) {
  return (api) =>
    api.getPosts(options)
      .then((posts) => ({type: 'POSTS_ADD', payload: posts}));
}

export function updatePost(postData) {
  return (api) =>
    api.savePost(postData)
      .then((post) => ({type: 'POST_UPDATE', payload: post}));
}
