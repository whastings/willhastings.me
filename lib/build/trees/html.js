const md = require('broccoli-md');
const stew = require('broccoli-stew');

const { find } = stew;

const contentTree = 'content';

module.exports = function htmlTree() {
  return md(find(contentTree, '**/*.md'));
};
