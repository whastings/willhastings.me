const glob = require('glob');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'app');

// Too bad Webpack needs these listed separately.
const RUNTIME_HELPERS = [
  'classCallCheck',
  'createClass',
  'extends',
  'inherits',
  'possibleConstructorReturn'
].map((helper) => `babel-runtime/helpers/${helper}`);

module.exports = {
  babelBrowser: require('./babel-browser'),

  babelNode: require('./babel-node'),

  sharedModules: glob.sync('utils/**/*', {cwd: APP_DIR})
    .map((file) => path.join(APP_DIR, file)),

  vendorModules: [
    '@whastings/js_utils',
    'page',
    'path-to-regexp',
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-promise-middleware',
    'redux-thunk',
    'reselect',
    'seamless-immutable'
  ].concat(RUNTIME_HELPERS)
};
