import AdminPostList from './AdminPostList';
import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from 'app/modules/posts/selectors';
import { PostList } from 'app/modules/posts/components';

const { Component, PropTypes } = React;

class AdminIndexPage extends Component {
  render() {
    let { onPostDelete, onSignOut, posts } = this.props;

    return (
      <section className="admin-index-page admin-index">
        <div className="admin-index__actions">
          <button type="button" className="btn-sign-out" onClick={onSignOut}>
            Sign Out
          </button>
          <a href="/admin/posts/new">Create Post</a>
        </div>

        <h1>Your Posts</h1>
        <AdminPostList posts={posts} onPostDelete={onPostDelete}/>
      </section>
    );
  }
}

AdminIndexPage.propTypes = {
  onPostDelete: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired
};

export default connect(
  (state) => ({posts: getPosts(state)})
)(AdminIndexPage);
