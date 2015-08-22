import React from 'react';
import template from './home.jsx';

export default React.createClass({
  render() {
    return template(this.props.content);
  }
});
