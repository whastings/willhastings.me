const md = require('broccoli-md');
const stew = require('broccoli-stew');

const { find } = stew;

const contentTree = 'content/';

module.exports = md(find(contentTree, '**/*.md'));
