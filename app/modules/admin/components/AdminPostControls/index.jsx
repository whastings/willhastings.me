import './styles.scss';
import React from 'react';
import { autobindMethods } from '@whastings/js_utils';

const { Component } = React;

export default class AdminPostListItem extends Component {
  handleDelete() {
    let { onDelete, post } = this.props;
    onDelete(post);
  }

  render() {
    let { post } = this.props,
        { permalink } = post;

    return (
      <ul className="admin-post-controls">
        <li>
          <a
            className="admin-post-controls__edit-link btn"
            href={`/admin/posts/${permalink}/edit`}
          >
            Edit
          </a>
        </li>
        <li>
          <button
            className="admin-post-controls__delete-btn"
            type="button"
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </li>
      </ul>
    );
  }
}

autobindMethods(AdminPostListItem, 'handleDelete');
