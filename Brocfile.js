var Eyeglass = require('broccoli-eyeglass'),
    md = require('broccoli-md'),
    mergeTrees = require('broccoli-merge-trees'),
    path = require('path'),
    stew = require('broccoli-stew');

var find = stew.find;

// Directories:
var contentTree = 'content/',
    stylesTree = 'styles/';

var htmlTree = md(find(contentTree, '**/*.md'));

stylesTree = new Eyeglass([stylesTree], {
  cssDir: 'styles',
  includePaths: [path.join(__dirname, 'node_modules')]
});

module.exports = mergeTrees([
  htmlTree,
  stylesTree
]);
