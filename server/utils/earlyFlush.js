const handlebars = require('server/utils/handlebars');

let earlyFlushResponse;
handlebars.render('start.hbs').then((result) => earlyFlushResponse = result);

module.exports = function earlyFlush(res) {
  res.write(earlyFlushResponse);
};
