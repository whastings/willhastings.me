module.exports = {
  plugins: [
    'transform-object-rest-spread',
    ['transform-runtime', {polyfill: false, regenerator: false}]
  ],
  presets: [
    ['es2015', {loose: true}],
    'react'
  ],
};
