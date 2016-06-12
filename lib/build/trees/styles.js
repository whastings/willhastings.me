const Eyeglass = require('broccoli-eyeglass');
const path = require('path');

const clientTree = 'client';

module.exports = function stylesTree() {
  return new Eyeglass([clientTree], {
    cssDir: '/',
    includePaths: [path.join(process.cwd(), 'node_modules'), '/node_modules']
  });
};
