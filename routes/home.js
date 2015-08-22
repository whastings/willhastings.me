import HomePage from '../components/pages/HomePage';
import React from 'react';

export default function homeRoute(app) {
  app.get('/', function(req, res) {
    var content = React.renderToString(
      React.createElement(HomePage, {content: '<strong>Welcome!</strong>'})
    );
    res.render('base', {content});
  });
}
