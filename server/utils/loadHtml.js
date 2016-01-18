import denodeify from 'denodeify';
import fs from 'fs';
import path from 'path';

const readFile = denodeify(fs.readFile);

const CONTENT_BASE = path.join(process.cwd(), 'dist', 'content');

export default function loadHtml(filePath) {
  return readFile(path.join(CONTENT_BASE, filePath));
}
