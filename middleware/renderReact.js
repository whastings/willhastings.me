import React from 'react';
import Router from 'react-router';
import routes from '../components/routes.jsx';

const IS_PROD = process.env.NODE_ENV === 'production';

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
      var state = {},
          data;
      state.content = reactContent;

      html = React.renderToString(
        React.createElement(Handler, state)
      );

      data = {html, isProd: IS_PROD};

      res.render('base', data);
    });
  };
}
