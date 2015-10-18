import React from 'react';
import { match, RoutingContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from '../components/routes.jsx';

const IS_PROD = process.env.NODE_ENV === 'production';

export default function renderReactMiddleware() {
  return function renderReact(req, res, next) {
    var reactContent = res.reactContent,
        html;

    if (!reactContent) {
      return next();
    }

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
      if (error) {
        res.send(500, error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        res.send(200, renderToString(<RoutingContext {...renderProps} />))
      } else {
        res.send(404, 'Not found')
      }
    });
  };
}
