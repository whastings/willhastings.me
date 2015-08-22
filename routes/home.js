export default function homeRoute(app) {
  app.get('/', function(req, res) {
    res.render('base', {content: 'WELCOME!'});
  });
}
