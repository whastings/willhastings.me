import React from 'react';
import template from './templates/homePage.jsx';

export default React.createClass({
  render() {
    return template(this.props.content);
  }
});
