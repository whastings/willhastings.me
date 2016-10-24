const asyncRoute = require('server/utils/asyncRoute');
const denodeify = require('denodeify');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(process.cwd(), 'dist/client');

const readdir = denodeify(fs.readdir);
let assetsMap;

module.exports = asyncRoute(function* assetsMiddleware(req, res, next) {
  if (!assetsMap) {
    let assets = yield readdir(ASSETS_DIR);
    assetsMap = assets.reduce((map, asset) => {
      map[asset.replace(/-[a-z0-9]+./, '.')] = asset;
      return map;
    }, {});
  }

  res.assets = assetsMap;
  next();
});
