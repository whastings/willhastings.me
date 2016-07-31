const denodeify = require('denodeify');
const fs = require('fs');
const path = require('path');

const readFile = denodeify(fs.readFile);

const DATA_DIR = path.join(process.cwd(), 'data');

module.exports = function loadJson(filePath) {
  return readFile(path.join(DATA_DIR, filePath))
    .then((content) => JSON.parse(content));
};
