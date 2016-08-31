import React from 'react';
import { autobindMethods } from '@whastings/js_utils';

const { Component } = React;

const KEYS_TO_DIRECTION = {
  39: 1,
  40: 1,
  37: -1,
  38: -1
};

export default class ProjectTabLink extends Component {
  focus() {
    if (this._linkEl) {
      this._linkEl.focus();
    }
  }

  handleArrowKey(event) {
    let direction = KEYS_TO_DIRECTION[event.keyCode];

    if (direction) {
      event.preventDefault();
      this.props.onSwitch(direction);
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onActivate(this.props.index);
  }

  setLinkEl(linkEl) {
    this._linkEl = linkEl;
  }

  render() {
    let { text, index, isActive } = this.props;
    let panelId = `project-tabpanel-${index}`;

    return (
      <li>
        <a
          href={`#${panelId}`}
          onClick={this.handleClick}
          onKeyDown={this.handleArrowKey}
          className={isActive ? 'active' : ''}
          role="tab"
          aria-controls={panelId}
          aria-selected={isActive}
          tabIndex={isActive ? 0 : -1}
          ref={this.setLinkEl}
        >
          {text}
        </a>
      </li>
    );
  }
}

autobindMethods(ProjectTabLink, 'handleArrowKey', 'handleClick', 'setLinkEl');
