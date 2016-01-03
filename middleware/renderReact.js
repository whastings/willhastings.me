import { renderToString } from 'react-dom/server';
import componentRouter from 'lib/componentRouter';
import React from 'react';

// TODO: Move to middleware.
const IS_PROD = process.env.NODE_ENV === 'production';

export default function renderReactMiddleware() {
  return function renderReact(req, res, next) {
    let reactProps = res.reactProps,
        component = reactProps ? componentRouter(res.routePath) : null,
        initData = res.initData,
        html;

    if (!component) {
      return next();
    }

    html = renderToString(React.createElement(component, reactProps));

    res.render('base', {
      html,
      data: JSON.stringify(initData || reactProps),
      isProd: IS_PROD
    });
  };
}
