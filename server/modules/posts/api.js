const co = require('co');
const formatters = require('./formatters');
const Post = require('./model');

const CACHE_KEY_POSTS_ALL = 'posts-all';
const CACHE_KEY_POSTS = 'posts';
const POST_UPDATE_FIELDS = ['title', 'body', 'permalink', 'published', 'publishDate'];
const POST_CREATE_FIELDS = POST_UPDATE_FIELDS.concat(['userId']);

// TODO: Replace with something more robust like Redis.
const cache = new Map();

module.exports = {
  createPost: co.wrap(function* createPost(postData) {
    let post = yield Post.model.create(postData, {fields: POST_CREATE_FIELDS});
    clearLists();
    return addToCache(post.permalink, formatters.post(post));
  }),

  destroyPost: co.wrap(function* destroyPost(postId) {
    let post = yield Post.model.findById(postId);
    yield post.destroy();
    clearLists();
    removeFromCache(...postCacheKeys(post.permalink));
  }),

  getPost(permalink, options = {}) {
    let cacheKey = postCacheKeys(permalink)[options.editable ? 1 : 0];

    return cacheOrQuery(
      cacheKey,
      () => Post.model.findOne({where: {permalink}})
        .then((post) => post ? formatters.post(post, options) : null)
    );
  },

  getPosts({includeUnpublished = false} = {}) {
    let conditions = includeUnpublished ? {} : {published: true};
    let cacheKey = conditions.published ? CACHE_KEY_POSTS_ALL : CACHE_KEY_POSTS;

    return cacheOrQuery(
      cacheKey,
      () => Post.model.findAll({where: conditions})
        .then(formatters.postList)
    );
  },

  updatePost: co.wrap(function* updatePost(postId, postData) {
    let post = yield Post.model.findById(postId);
    yield post.update(postData, {fields: POST_UPDATE_FIELDS});
    clearLists();
    removeFromCache(...postCacheKeys(post.permalink));

    return addToCache(post.permalink, formatters.post(post));
  })
};

function addToCache(key, value) {
  cache.set(key, value);
  return value;
}

function cacheOrQuery(cacheKey, queryFn) {
  let cachedValue = cache.get(cacheKey);

  if (cachedValue) {
    return Promise.resolve(cachedValue);
  }

  return queryFn()
    .then((result) => {
      cache.set(cacheKey, result);
      return result;
    });
}

function clearLists() {
  removeFromCache(CACHE_KEY_POSTS, CACHE_KEY_POSTS_ALL);
}

function postCacheKeys(permalink) {
  return [permalink, `${permalink}-editable`];
}

function removeFromCache(...keys) {
  keys.forEach((key) => cache.delete(key));
}
