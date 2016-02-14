import api from 'server/api';
import asyncRoute from 'server/utils/asyncRoute';

export default function postsRoutes(app) {
  app.get('/api/posts', asyncRoute(function* postsRouteIndex(req, res) {
    res.json(yield api.getPosts());
  }));

  app.get('/api/posts/:post', asyncRoute(function* postsRouteView(req, res) {
    let permalink = req.params.post;
    res.json(yield api.getPost(permalink));
  }));
}
