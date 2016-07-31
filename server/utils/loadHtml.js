const denodeify = require('denodeify');
const fs = require('fs');
const path = require('path');

const readFile = denodeify(fs.readFile);

const CONTENT_BASE = path.join(process.cwd(), 'dist', 'client', 'content');

module.exports = function loadHtml(filePath) {
  return readFile(path.join(CONTENT_BASE, filePath));
};
