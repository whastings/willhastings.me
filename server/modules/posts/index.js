const api = require('./api');
const asyncRoute = require('server/utils/asyncRoute');
const authMiddleware = require('server/middleware/auth');
const express = require('express');

const app = express();

app.get('/', asyncRoute(function* postsRouteIndex(req, res) {
  let options = {includeUnpublished: !!req.query.includeUnpublished};

  if (options.includeUnpublished && !req.currentUser) {
    res.status(401).end();
    return;
  }

  res.json(yield api.getPosts(options));
}));

app.get('/:post', asyncRoute(function* postsRouteView(req, res) {
  let permalink = req.params.post;
  let options = {editable: !!req.query.editable};
  let post = yield api.getPost(permalink, options);

  if (!post || (!post.published && !req.currentUser)) {
    res.status(404).end();
  }

  res.json(post);
}));

app.post('/', authMiddleware, asyncRoute(function* postsRouteCreate(req, res) {
  let postData = req.body.post,
      user = req.currentUser;

  postData = Object.assign({}, postData, {userId: user.id});
  let post = yield api.createPost(postData);

  res.json(post);
}));

app.put('/:postId', authMiddleware, asyncRoute(function* postsRouteUpdate(req, res) {
  let postData = req.body.post;
  let { postId } = req.params;
  let post = yield api.updatePost(postId, postData);

  res.json(post);
}));

app.delete('/:postId', authMiddleware, asyncRoute(function* postsRouteDelete(req, res) {
  let { postId } = req.params;

  yield api.destroyPost(postId);

  res.end();
}));

module.exports = app;
