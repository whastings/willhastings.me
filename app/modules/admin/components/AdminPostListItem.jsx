import autobind from 'autobind-decorator';
import React from 'react';

const { Component, PropTypes } = React;

export default class AdminPostListItem extends Component {
  @autobind
  handleDelete() {
    let { onDelete, post } = this.props;
    onDelete(post);
  }

  render() {
    let { post } = this.props,
        { permalink } = post;

    return (
      <li className="admin-post-list__item">
        <a href={`/blog/${permalink}`}>{post.title}</a>
        - <a href={`/admin/posts/${permalink}/edit`}>Edit</a>
        - <button className="post-delete-btn" type="button" onClick={this.handleDelete}>
            Delete
          </button>
      </li>
    );
  }
}
