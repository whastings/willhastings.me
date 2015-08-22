import express from 'express';
import handlebars from 'express-handlebars';

// Routes:
import homeRoute from './routes/home';

var PORT = 8000;

var app = express();

// App settings:
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Apply routes.
[homeRoute].forEach(route => route(app));

console.log(`Listening on ${PORT}`);
app.listen(PORT);
