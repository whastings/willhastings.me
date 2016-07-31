module.exports = {
  plugins: [
    'transform-object-rest-spread',
    ['transform-runtime', {polyfill: false, regenerator: false}]
  ],
  presets: ['react', 'es2015-node']
};
