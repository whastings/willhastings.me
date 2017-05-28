// @flow

import './styles.scss';
import React from 'react';
import { autobindMethods } from '@whastings/js_utils';
import type { Post } from 'posts/types';

const { Component } = React;

export default class AdminPostListItem extends Component {
  props: {
    onDelete: (Post) => void,
    post: Post,
  };

  handleDelete() {
    const { onDelete, post } = this.props;
    onDelete(post);
  }

  render() {
    const { post } = this.props;
    const { permalink } = post;

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
