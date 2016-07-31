const api = require('./api');
const asyncRoute = require('server/utils/asyncRoute');
const express = require('express');

const app = express();

app.get('/', asyncRoute(function* pageRouteGet(req, res) {
  res.json(yield api.getProjectsPage());
}));

module.exports = app;
