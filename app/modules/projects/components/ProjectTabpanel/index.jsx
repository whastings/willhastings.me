import './styles.scss';
import ProjectList from 'projects/components/ProjectList';
import React from 'react';

const { Component } = React;

export default class ProjectTabpanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRender: !!props.isActive
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isActive && !this.state.shouldRender) {
      this.setState({shouldRender: true});
    }
  }

  render() {
    let { shouldRender } = this.state;
    let { category, index, isActive } = this.props;
    let attrs = {
      id: `project-tabpanel-${index}`,
      role: 'tabpanel',
      className: 'project-tabpanel' + (isActive ? ' active' : ''),
      'aria-hidden': !isActive
    };

    return (
      <section {...attrs}>
        {shouldRender && <ProjectList projects={category.projects}/>}
      </section>
    );
  }
}
