import './styles.scss';
import ProjectTabpanel from 'projects/components/ProjectTabpanel';
import ProjectTabLink from 'projects/components/ProjectTabLink';
import React from 'react';
import { map } from 'app/utils';
import { autobindMethods } from '@whastings/js_utils';

const { Component } = React;

export default class ProjectTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };
    this._links = [];
  }

  handleTabClick(i) {
    this._changeTab(i);
  }

  handleTabSwitch(direction) {
    let newIndex = this.state.currentIndex + direction;
    let maxIndex = this.props.categories.length - 1;

    if (newIndex < 0) {
      newIndex = maxIndex;
    } else if (newIndex > maxIndex) {
      newIndex = 0;
    }

    this._links[newIndex].focus();
    this._changeTab(newIndex);
  }

  _addLink(link, index) {
    this._links[index] = link;
  }

  _changeTab(index) {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    let { categories } = this.props;
    let currentCategory = categories[this.state.currentIndex];

    return (
      <div className="project-tabs">
        <div className="wrapper">
          <ul className="project-tabs__tab-list" role="tablist">
            {map(categories, (category, i) =>
              <ProjectTabLink
                text={category.name}
                index={i}
                isActive={category === currentCategory}
                onActivate={this.handleTabClick}
                onSwitch={this.handleTabSwitch}
                key={i}
                ref={(link) => this._addLink(link, i)}
              />
            )}
          </ul>
        </div>

        {map(categories, (category, index) =>
          <ProjectTabpanel
            category={category}
            index={index}
            isActive={category === currentCategory}
            key={category.name}
          />
        )}
      </div>
    );
  }
}

autobindMethods(ProjectTabs, 'handleTabSwitch', 'handleTabClick');
