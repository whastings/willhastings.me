const expressHandlebars = require('express-handlebars');
const path = require('path');
const templateHelpers = require('server/utils/templateHelpers');

const TEMPLATE_DIR = path.resolve(__dirname, '../templates');

const handlebars = expressHandlebars.create({
  extname: '.hbs',
  helpers: templateHelpers,
});

module.exports = {
  render(relativeTemplatePath, ...args) {
    const templatePath = path.join(TEMPLATE_DIR, relativeTemplatePath);
    return handlebars.render(templatePath, ...args);
  }
};
