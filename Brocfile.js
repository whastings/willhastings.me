var Eyeglass = require('broccoli-eyeglass'),
    md = require('broccoli-md'),
    mergeTrees = require('broccoli-merge-trees'),
    path = require('path'),
    stew = require('broccoli-stew'),
    webpack = require('broccoli-webpack-fast'),
    webpackConfig = require('./config/webpack.config');

var find = stew.find;

// Directories:
var contentTree = 'content/',
    stylesTree = 'styles/';

var htmlTree = md(find(contentTree, '**/*.md'));

var jsTree = webpack(webpackConfig);

stylesTree = new Eyeglass([stylesTree], {
  cssDir: 'styles',
  includePaths: [path.join(__dirname, 'node_modules')]
});

module.exports = mergeTrees([
  htmlTree,
  jsTree,
  stylesTree
]);
