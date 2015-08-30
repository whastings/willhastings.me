import express from 'express';
import handlebars from 'express-handlebars';
import renderReact from './middleware/renderReact';

// Routes:
import homeRoute from './routes/home';

var PORT = 8000;

var app = express();

// App settings:
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Apply routes.
[homeRoute].forEach(route => route(app));

// Apply post-routes middleware.
app.use(renderReact());

console.log(`Listening on ${PORT}`);
app.listen(PORT);
