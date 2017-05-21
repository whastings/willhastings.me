module.exports = {
  plugins: [
    'transform-es2015-destructuring',
    'transform-object-rest-spread',
    ['transform-runtime', {polyfill: false, regenerator: false}]
  ],
  presets: [
    'es2015-node',
    'react',
  ],
};
