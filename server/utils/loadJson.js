import denodeify from 'denodeify';
import fs from 'fs';
import path from 'path';

const readFile = denodeify(fs.readFile);

const DATA_DIR = path.join(process.cwd(), 'data');

export default function loadJson(filePath) {
  return readFile(path.join(DATA_DIR, filePath))
    .then((content) => JSON.parse(content));
}
