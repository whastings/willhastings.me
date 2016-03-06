import api from './api';
import asyncRoute from 'server/utils/asyncRoute';
import express from 'express';

const app = express();

app.get('/', asyncRoute(function* pageRouteGet(req, res) {
  res.json(yield api.getProjectsPage());
}));

export default app;
