import api from 'server/api';
import asyncRoute from 'server/utils/asyncRoute';

export default function postsRoutes(app) {
  app.get('/api/posts', asyncRoute(function* postsRouteIndex(req, res) {
    res.json(yield api.getPosts());
  }));
}
