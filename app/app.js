import componentRouter from 'lib/componentRouter';
import initialLoader from 'app/utils/initialLoader';
import page from 'page';
import React from 'react';
import { render } from 'react-dom';

const rootEl = document.querySelector('.site-main');

// Pre-route middleware:
page('*', initialLoader());
page('*', findComponent);

// Apply routes.
import adminRoute from 'app/routes/admin';
import homeRoute from 'app/routes/home';
import projectsRoute from 'app/routes/projects';
[
  adminRoute,
  homeRoute,
  projectsRoute
].forEach((route) => route(page));

// Post-route middleware:
page('*', renderComponent);

// Start router.
page();

function findComponent(data, next) {
  data.component = componentRouter(data.pathname);
  next();
}

function renderComponent(data) {
  let { component, props } = data;
  render(React.createElement(component, props), rootEl);
}
