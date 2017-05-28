// @flow

import AdminPageLayout from 'admin/components/AdminPageLayout';
import AdminPostList from 'admin/components/AdminPostList';
import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from 'posts/selectors';
import type { Post } from 'posts/types';
import type { State } from 'app/types';

const { Component } = React;

class AdminIndexPage extends Component {
  props: {
    posts: Post[],
    onPostDelete: Function,
    onSignOut: Function,
  };

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

export default connect(
  (state: State) => ({posts: getPosts(state)})
)(AdminIndexPage);
