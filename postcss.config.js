const autoprefixer = require('autoprefixer');
const flexboxFixes = require('postcss-flexbugs-fixes');

module.exports = {
  plugins: [
    flexboxFixes(),
    autoprefixer({remove: false})
  ]
};
