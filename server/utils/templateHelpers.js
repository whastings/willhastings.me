const path = require('path');

const STATS_FILE = path.join(process.cwd(), 'dist/client/assets.json');
const DEV_ASSET_HOST = 'http://localhost:8080/';
const IS_PROD = process.env.NODE_ENV === 'production';

const assetsMap = IS_PROD ? require(STATS_FILE) : {};

module.exports = {
  getAsset(filename) {
    if (!IS_PROD) {
      return DEV_ASSET_HOST + filename;
    }
    const [ name, extension ] = filename.split('.');

    return assetsMap[name][extension];
  }
};
