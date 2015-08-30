var md = require('broccoli-md'),
    stew = require('broccoli-stew');

var find = stew.find;

var contentTree = 'content/';

var htmlTree = md(find(contentTree, '**/*.md'));

module.exports = htmlTree;
