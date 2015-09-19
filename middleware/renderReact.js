import React from 'react';
import Router from 'react-router';
import routes from '../components/routes.jsx';

export default function renderReactMiddleware() {
  return function renderReact(req, res, next) {
    var reactContent = res.reactContent,
        router,
        html;

    if (!reactContent) {
      return next();
    }

    router = Router.create({routes, location: req.url});

    router.run(function(Handler) {
      var state = {};
      state.content = reactContent;

      html = React.renderToString(
        React.createElement(Handler, state)
      );

      res.render('base', {html});
    });
  };
}
