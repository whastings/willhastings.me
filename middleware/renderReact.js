import React from 'react';

export default function renderReactMiddleware() {
  return function renderReact(req, res) {
    var reactData = res.reactData,
        html;
    if (!reactData) {
      return next();
    }

    html = React.renderToString(
      React.createElement(reactData.component, {content: reactData.content})
    );

    res.render('base', {html});
  };
}
