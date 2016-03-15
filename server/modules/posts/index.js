import api from './api';
import asyncRoute from 'server/utils/asyncRoute';
import authMiddleware from 'server/middleware/auth';
import express from 'express';
import Post from './model';

const POST_UPDATE_FIELDS = ['title', 'body', 'permalink'],
      POST_CREATE_FIELDS = POST_UPDATE_FIELDS.concat(['userId']);

const app = express();

app.get('/', asyncRoute(function* postsRouteIndex(req, res) {
  res.json(yield api.getPosts());
}));

app.get('/:post', asyncRoute(function* postsRouteView(req, res) {
  let permalink = req.params.post;
  res.json(yield api.getPost(permalink));
}));

app.post('/', authMiddleware, asyncRoute(function* postsRouteCreate(req, res) {
  let postData = req.body.post,
      user = req.currentUser;

  postData = Object.assign({}, postData, {userId: user.id});
  let post = yield Post.model.create(postData, {fields: POST_CREATE_FIELDS});

  res.json(post.toJSON());
}));

app.put('/:postId', authMiddleware, asyncRoute(function* postsRouteUpdate(req, res) {
  let postData = req.body.post,
      { postId } = req.params,
      post = yield Post.model.findById(postId);

  yield post.update(postData, {fields: POST_UPDATE_FIELDS});

  res.json(post.toJSON());
}));

app.delete('/:postId', authMiddleware, asyncRoute(function* postsRouteDelete(req, res) {
  let { postId } = req.params;

  yield Post.model.destroy({where: {id: postId}});

  res.end();
}));

export default app;
