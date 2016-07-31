const co = require('co');
const loadHtml = require('server/utils/loadHtml');

module.exports = {
  getHomePage: co.wrap(function* loadHomePage() {
    return {
      content: (yield loadHtml('pages/home.html')).toString(),
      id: 'home'
    };
  })
};
