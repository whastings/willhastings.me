import React from 'react';
import Router from 'react-router';
import routes from '../components/routes.jsx';

export default function renderReactMiddleware() {
  return function renderReact(req, res) {
    var reactContent = res.reactContent,
        router = Router.create({routes, location: req.url}),
        html;

    router.run(function(Handler) {
      var state = {};
      if (reactContent) {
        state.content = reactContent;
      }

      html = React.renderToString(
        React.createElement(Handler, state)
      );

      res.render('base', {html});
    });
  };
}
