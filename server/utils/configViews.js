import handlebars from 'express-handlebars';
import path from 'path';

const TEMPLATES_DIR = path.resolve(__dirname, '../templates');

export default function configViews(app) {
  app.set('views', TEMPLATES_DIR);
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(TEMPLATES_DIR, 'layouts'),
    partialsDir: path.join(TEMPLATES_DIR, 'partials')
  }));
  app.set('view engine', '.hbs');
}
