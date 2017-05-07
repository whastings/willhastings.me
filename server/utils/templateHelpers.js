const path = require('path');

const STATS_FILE = path.join(process.cwd(), 'dist/client/stats.json');
const DEV_ASSET_HOST = 'http://localhost:8080/';
const IS_PROD = process.env.NODE_ENV === 'production';

const assetsMap = IS_PROD ? require(STATS_FILE) : {};

module.exports = {
  getAsset(name) {
    if (!IS_PROD) {
      return DEV_ASSET_HOST + name;
    }

    return `/${assetsMap[name]}`;
  }
};
