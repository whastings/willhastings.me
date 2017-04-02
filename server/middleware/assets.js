const asyncRoute = require('server/utils/asyncRoute');
const denodeify = require('denodeify');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(process.cwd(), 'dist/client');
const IS_PROD = process.env.NODE_ENV === 'production';

const readdir = denodeify(fs.readdir);
let assetsMap;

module.exports = asyncRoute(function* assetsMiddleware(req, res, next) {
  if (!assetsMap) {
    let assets = yield readdir(ASSETS_DIR);
    assetsMap = assets.reduce((map, asset) => {
      map[asset.replace(/-[a-z0-9]+./, '.')] = (IS_PROD ? '/' : 'http://localhost:8080/') + asset;
      return map;
    }, {});
  }

  res.assets = assetsMap;
  next();
});
