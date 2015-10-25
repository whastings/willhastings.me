import componentRouter from '../lib/componentRouter';
import initialLoader from './utils/initialLoader';
import page from 'page';
import React from 'react';
import router from './router';
import { render } from 'react-dom';

const rootEl = document.querySelector('.site-main');

page('*', initialLoader());

Object.keys(router)
  .forEach((routeName) => page(
    routeName, findComponent.bind(null, routeName), router[routeName]
  ));

page('*', renderComponent);

page();

function findComponent(routeName, data, next) {
  data.component = componentRouter(routeName);
  next();
}

function renderComponent(data) {
  let { component, props } = data;
  render(React.createElement(component, props), rootEl);
}
