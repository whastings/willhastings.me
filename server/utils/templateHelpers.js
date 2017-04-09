const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(process.cwd(), 'dist/client');
const DEV_ASSET_HOST = 'http://localhost:8080/';
const IS_PROD = process.env.NODE_ENV === 'production';

const assetsMap = IS_PROD ? getAssetsMap() : {};

module.exports = {
  getAsset(name) {
    if (!IS_PROD) {
      return DEV_ASSET_HOST + name;
    }

    return `/${assetsMap[name]}`;
  }
};

function getAssetsMap() {
  const assets = fs.readdirSync(ASSETS_DIR);
  return assets.reduce((map, asset) => {
    map[asset.replace(/-[a-z0-9]+./, '.')] = asset;
    return map;
  }, {});
}
