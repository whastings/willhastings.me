import api from 'server/api';
import asyncRoute from 'server/utils/asyncRoute';
import authMiddleware from 'server/middleware/auth';
import Post from 'server/models/Post';

const POST_ALLOWED_FIELDS = ['title', 'body', 'userId', 'permalink'];

export default function postsRoutes(app) {
  app.get('/api/posts', asyncRoute(function* postsRouteIndex(req, res) {
    res.json(yield api.getPosts());
  }));

  app.get('/api/posts/:post', asyncRoute(function* postsRouteView(req, res) {
    let permalink = req.params.post;
    res.json(yield api.getPost(permalink));
  }));

  app.post('/api/posts', authMiddleware, asyncRoute(function* postsRouteCreate(req, res) {
    let postData = req.body.post,
        user = req.currentUser;

    postData = Object.assign({}, postData, {userId: user.id});
    let post = yield Post.model.create(postData, {fields: POST_ALLOWED_FIELDS});

    res.json(post.toJSON());
  }));
}
