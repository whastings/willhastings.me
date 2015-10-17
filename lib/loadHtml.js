import denodeify from 'denodeify';
import fs from 'fs';
import path from 'path';

var readFile = denodeify(fs.readFile);

var CONTENT_BASE = path.join(process.cwd(), 'dist', 'content');

export default function loadHtml(filePath) {
  return readFile(path.join(CONTENT_BASE, filePath));
}
