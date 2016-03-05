import AdminPostListItem from './AdminPostListItem';
import autobind from 'autobind-decorator';
import React from 'react';
import { PostList } from 'app/modules/posts/components';

const { Component, PropTypes } = React;

export default class AdminIndexPage extends Component {
  render() {
    let { onSignOut, posts } = this.props;

    return (
      <section className="admin-index-page admin-index">
        <div className="admin-index__actions">
          <button type="button" className="btn-sign-out" onClick={onSignOut}>
            Sign Out
          </button>
          <a href="/admin/posts/new">Create Post</a>
        </div>

        <h1>Your Posts</h1>
        <PostList posts={posts} ItemComponent={AdminPostListItem}/>
      </section>
    );
  }
}

AdminIndexPage.propTypes = {
  onSignOut: PropTypes.func.isRequired
};
