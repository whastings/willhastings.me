var Eyeglass = require('broccoli-eyeglass'),
    md = require('broccoli-md'),
    mergeTrees = require('broccoli-merge-trees'),
    path = require('path'),
    stew = require('broccoli-stew'),
    watchedTree = require('broccoli-watched-tree'),
    webpack = require('broccoli-webpack-fast'),
    webpackConfig = require('./config/webpack.config');

var find = stew.find;

var IS_PROD = process.env.NODE_ENV === 'production';

// Directories:
var contentTree = 'content/',
    clientTree = 'client/';

var htmlTree = md(find(contentTree, '**/*.md'));

var jsTree = webpack(webpackConfig);

if (!IS_PROD) {
  jsTree = mergeTrees([jsTree, watchedTree('app/')]);
}

stylesTree = new Eyeglass([clientTree], {
  cssDir: '/',
  includePaths: [path.join(__dirname, 'node_modules'), '/node_modules']
});

module.exports = mergeTrees([
  htmlTree,
  jsTree,
  stylesTree
]);
