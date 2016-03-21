module.exports = {
  exclude: 'node_modules',
  plugins: [
    'check-es2015-constants',
    'transform-decorators-legacy',
    'transform-es2015-block-scoped-functions',
    'transform-es2015-block-scoping',
    'transform-es2015-classes',
    'transform-es2015-destructuring',
    'transform-es2015-literals',
    //'transform-es2015-modules-systemjs',
    'transform-es2015-object-super',
    'transform-es2015-parameters',
    'transform-es2015-sticky-regex',
    'transform-es2015-typeof-symbol',
    'transform-es2015-unicode-regex',
    'transform-object-rest-spread'
  ],
  presets: ['react']
};
