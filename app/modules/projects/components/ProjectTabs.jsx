import ProjectList from './ProjectList';
import React from 'react';
import { map } from 'app/utils';

const { Component } = React;

export default class ProjectTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: props.categories[0]
    };
  }

  _changeTab(event, index) {
    event.preventDefault();
    this.setState({
      currentCategory: this.props.categories[index]
    });
  }

  render() {
    let { categories } = this.props,
        { currentCategory } = this.state;

    return (
      <div className="project-tabs">
        <ul className="project-tabs__tab-list">
          {map(categories, (category, i) => (
            <li key={category.name}>
              <a
                href="#"
                onClick={(event) => this._changeTab(event, i)}
                className={category === currentCategory ? 'active' : ''}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
        <ProjectList projects={currentCategory.projects}/>
      </div>
    );
  }
}
