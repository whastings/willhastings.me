import React from 'react';
import template from './templates/projectTabs';

export default React.createClass({
  getInitialState() {
    return {
      currentCategory: this.props.categories[0]
    };
  },

  render() {
    return template({
      categories: this.props.categories,
      currentCategory: this.state.currentCategory,
      onTabClick: this._changeTab
    });
  },

  _changeTab(index) {
    this.setState({
      currentCategory: this.props.categories[index]
    });
  }
});
