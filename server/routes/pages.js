import api from 'server/api';
import asyncRoute from 'server/utils/asyncRoute';

export default function pagesRoutes(app) {
  app.get('/api/pages/:page', asyncRoute(function* pageRouteGet(req, res) {
    let page = req.params.page;
    res.json(yield api.getPage(page));
  }));
}
