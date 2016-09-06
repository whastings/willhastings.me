import AdminPageLayout from 'admin/components/AdminPageLayout';
import AdminPostList from 'admin/components/AdminPostList';
import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from 'app/modules/posts/selectors';

const { Component, PropTypes } = React;

class AdminIndexPage extends Component {
  render() {
    let { onPostDelete, onSignOut, posts } = this.props;

    return (
      <AdminPageLayout onSignOut={onSignOut}>
        <section className="admin-post-index">
          <h2 className="section-title">Your Posts</h2>
          <AdminPostList posts={posts} onPostDelete={onPostDelete}/>
        </section>
      </AdminPageLayout>
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
