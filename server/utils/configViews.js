const handlebars = require('express-handlebars');
const path = require('path');

const TEMPLATES_DIR = path.resolve(__dirname, '../templates');

module.exports = function configViews(app) {
  app.set('views', TEMPLATES_DIR);
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(TEMPLATES_DIR, 'layouts'),
    partialsDir: path.join(TEMPLATES_DIR, 'partials'),
    helpers: {
      get(object, key) {
        return object[key];
      }
    }
  }));
  app.set('view engine', '.hbs');
};
