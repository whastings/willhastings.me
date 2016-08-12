const APP_DIST_DIR = 'dist/server';
const APP_SRC = `${APP_DIST_DIR}/app`;
const fs = require('fs');
const reload = require('require-reload');

const IS_DEV = process.env.NODE_ENV === 'development';

let App = require(APP_SRC);

module.exports = function loadApp() {
  if (IS_DEV) {
    let srcFiles = fs.readdirSync(APP_DIST_DIR);
    srcFiles.forEach((file) => reload(`${APP_DIST_DIR}/${file}`));
    App = require(APP_SRC);
  }

  return App.default;
};
