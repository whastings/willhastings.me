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

  sharedModules: [
    // TODO
  ],

  vendorModules: [
    '@whastings/js_utils',
    'autobind-decorator',
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
