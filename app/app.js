import componentRouter from '../lib/componentRouter';
import page from 'page';
import React from 'react';
import router from './router';
import { render } from 'react-dom';

const rootEl = document.querySelector('.site-main');

Object.keys(router)
  .forEach((routeName) => page(routeName, findComponent.bind(null, routeName)));

page('*', renderComponent);

function findComponent(routeName, data, next) {
  data.state.component = componentRouter(routeName);
  next();
}

function renderComponent(data) {
  var component = data.state.component;
  render(React.createElement(component), rootEl);
}
