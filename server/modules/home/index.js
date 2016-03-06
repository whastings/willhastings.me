import api from './api';
import asyncRoute from 'server/utils/asyncRoute';
import express from 'express';

const app = express();

app.get('/', asyncRoute(function* homePageLoad(req, res) {
  res.json(yield api.getHomePage());
}));

export default app;
