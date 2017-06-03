module.exports = {
  plugins: [
    'syntax-dynamic-import',
    'transform-es2015-destructuring',
    'transform-object-rest-spread',
    ['transform-runtime', {polyfill: false, regenerator: false}],
  ],
  presets: ['react', 'es2015-node']
};
